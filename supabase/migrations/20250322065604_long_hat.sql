/*
  # Update campaigns table structure
  
  1. Changes
    - Remove starts_at column
    - Make expires_at optional
    - Remove status column and its dependencies
    
  2. Security
    - Drop policies that depend on status
    - Create new policies without status dependency
*/

DO $$ 
BEGIN
  -- Drop policies that depend on status
  DROP POLICY IF EXISTS "Public can view active campaigns" ON campaigns;
  
  -- Remove starts_at column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'starts_at'
  ) THEN
    ALTER TABLE campaigns DROP COLUMN starts_at;
  END IF;

  -- Make expires_at nullable if it's not already
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'expires_at' AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE campaigns ALTER COLUMN expires_at DROP NOT NULL;
  END IF;

  -- Remove status column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'status'
  ) THEN
    ALTER TABLE campaigns DROP COLUMN status;
  END IF;
END $$;

-- Create new public view policy without status dependency
CREATE POLICY "Public can view all campaigns"
  ON campaigns
  FOR SELECT
  TO public
  USING (true);