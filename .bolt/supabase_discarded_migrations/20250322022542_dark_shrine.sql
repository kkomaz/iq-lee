/*
  # Add referral system tables

  1. New Tables
    - `referral_codes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `code` (text, unique)
      - `uses` (int, default 0)
      - `max_uses` (int, nullable)
      - `expires_at` (timestamptz, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `referral_uses`
      - `id` (uuid, primary key) 
      - `referral_code_id` (uuid, references referral_codes)
      - `referred_user_id` (uuid, references auth.users)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for:
      - Users can read their own referral codes
      - Users can create referral codes
      - Public can read valid referral codes
      - Track referral uses automatically
*/

-- Create referral_codes table
CREATE TABLE IF NOT EXISTS referral_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  code text UNIQUE NOT NULL,
  uses int DEFAULT 0 NOT NULL,
  max_uses int,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create referral_uses table
CREATE TABLE IF NOT EXISTS referral_uses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code_id uuid REFERENCES referral_codes(id) ON DELETE CASCADE NOT NULL,
  referred_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_uses ENABLE ROW LEVEL SECURITY;

-- Policies for referral_codes
CREATE POLICY "Users can view own referral codes"
  ON referral_codes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create referral codes"
  ON referral_codes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can read valid referral codes"
  ON referral_codes
  FOR SELECT
  TO public
  USING (
    (expires_at IS NULL OR expires_at > now())
    AND (max_uses IS NULL OR uses < max_uses)
  );

-- Policies for referral_uses
CREATE POLICY "Users can view own referral uses"
  ON referral_uses
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM referral_codes WHERE id = referral_code_id
    )
    OR
    auth.uid() = referred_user_id
  );

CREATE POLICY "System can create referral uses"
  ON referral_uses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = referred_user_id);

-- Function to update referral code uses count
CREATE OR REPLACE FUNCTION update_referral_code_uses()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE referral_codes
  SET uses = uses + 1,
      updated_at = now()
  WHERE id = NEW.referral_code_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update uses count
CREATE TRIGGER update_referral_code_uses_trigger
  AFTER INSERT ON referral_uses
  FOR EACH ROW
  EXECUTE FUNCTION update_referral_code_uses();