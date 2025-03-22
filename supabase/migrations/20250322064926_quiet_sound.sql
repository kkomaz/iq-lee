/*
  # Create campaigns table with updated schema

  1. New Tables
    - `campaigns`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `long_description` (text)
      - `distribution_details` (text)
      - `image_url` (text)
      - `reward_amount` (text)
      - `status` (text)
      - `is_featured` (boolean)
      - `is_new` (boolean)
      - `is_sponsored` (boolean)
      - `tags` (jsonb)
      - `starts_at` (timestamptz)
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on campaigns table
    - Add policies for:
      - Public can view active campaigns
      - Authenticated users can manage their own campaigns

  3. Indexes
    - Primary key on id
    - Index on user_id for faster lookups
    - Index on status for filtering
    - Index on is_featured for featured campaigns queries
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS campaigns;

-- Create updated_at function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create campaigns table
CREATE TABLE campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Basic Information
  title text NOT NULL,
  description text,
  long_description text,
  distribution_details text,
  image_url text,
  reward_amount text NOT NULL DEFAULT '0',
  
  -- Campaign Status
  status text NOT NULL DEFAULT 'draft',
  is_featured boolean DEFAULT false,
  is_new boolean DEFAULT true,
  is_sponsored boolean DEFAULT false,
  
  -- Tags (as JSONB array for flexibility)
  tags JSONB DEFAULT '[]',
  
  -- Timing
  starts_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- Add status check constraint
  CONSTRAINT valid_status CHECK (status IN ('draft', 'active', 'paused', 'completed'))
);

-- Create indexes
CREATE INDEX campaigns_user_id_idx ON campaigns(user_id);
CREATE INDEX campaigns_status_idx ON campaigns(status);
CREATE INDEX campaigns_is_featured_idx ON campaigns(is_featured);

-- Enable Row Level Security
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Create trigger for updated_at
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create RLS Policies

-- Public can view active campaigns
CREATE POLICY "Public can view active campaigns"
  ON campaigns
  FOR SELECT
  TO public
  USING (status = 'active');

-- Users can view all their own campaigns
CREATE POLICY "Users can view own campaigns"
  ON campaigns
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own campaigns
CREATE POLICY "Users can insert own campaigns"
  ON campaigns
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own campaigns
CREATE POLICY "Users can update own campaigns"
  ON campaigns
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own campaigns
CREATE POLICY "Users can delete own campaigns"
  ON campaigns
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);