/*
  # Update schema for campaigns

  1. Changes
    - Drop rewards table
    - Ensure campaigns table exists with proper user authentication

  2. Tables
    - `campaigns`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `expires_at` (timestamptz)
      - `value` (int)
      - `featured` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  3. Security
    - Enable RLS
    - Ensure policies exist for public viewing and user management
*/

-- Drop the rewards table
DROP TABLE IF EXISTS rewards;

-- Create campaigns table if it doesn't exist
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  image_url text,
  expires_at timestamptz NOT NULL,
  value int NOT NULL DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public can view all campaigns" ON campaigns;
    DROP POLICY IF EXISTS "Users can manage own campaigns" ON campaigns;
END $$;

-- Create policies
CREATE POLICY "Public can view all campaigns"
  ON campaigns
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can manage own campaigns"
  ON campaigns
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create or replace function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop and recreate trigger to ensure it's up to date
DROP TRIGGER IF EXISTS update_campaigns_updated_at ON campaigns;
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();