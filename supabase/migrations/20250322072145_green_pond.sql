/*
  # Drop all campaign-related functions
  
  This migration removes all variations of campaign-related functions to clean up the schema
  and prepare for a fresh implementation.
*/

-- Drop all variations of create_campaign function
DO $$ 
BEGIN
  -- Drop function with individual parameters
  DROP FUNCTION IF EXISTS create_campaign(
    text, text, text, text, text, text, 
    boolean, boolean, boolean, timestamptz, jsonb
  );
  
  -- Drop JSON version
  DROP FUNCTION IF EXISTS create_campaign(json);
  
  -- Drop JSONB version
  DROP FUNCTION IF EXISTS create_campaign(jsonb);
END $$;

-- Drop all variations of update_campaign function
DO $$ 
BEGIN
  -- Drop function with individual parameters
  DROP FUNCTION IF EXISTS update_campaign(
    uuid, text, text, text, text, text, text,
    boolean, boolean, boolean, timestamptz, jsonb
  );
  
  -- Drop JSON version
  DROP FUNCTION IF EXISTS update_campaign(json);
  
  -- Drop JSONB version
  DROP FUNCTION IF EXISTS update_campaign(jsonb);
END $$;