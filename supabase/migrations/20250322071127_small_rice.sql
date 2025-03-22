/*
  # Add RPC functions for campaign management

  1. New Functions
    - `create_campaign`: Creates a new campaign with proper validation
    - `update_campaign`: Updates an existing campaign with validation
*/

-- Function to create a new campaign
CREATE OR REPLACE FUNCTION create_campaign(
  title text,
  description text,
  long_description text DEFAULT NULL,
  distribution_details text DEFAULT NULL,
  image_url text DEFAULT NULL,
  reward_amount text DEFAULT '0',
  is_featured boolean DEFAULT false,
  is_new boolean DEFAULT true,
  is_sponsored boolean DEFAULT false,
  expires_at timestamptz DEFAULT NULL,
  tags jsonb DEFAULT '[]'::jsonb
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_campaign campaigns;
BEGIN
  -- Insert the new campaign
  INSERT INTO campaigns (
    user_id,
    title,
    description,
    long_description,
    distribution_details,
    image_url,
    reward_amount,
    is_featured,
    is_new,
    is_sponsored,
    expires_at,
    tags
  )
  VALUES (
    auth.uid(),
    title,
    description,
    long_description,
    distribution_details,
    image_url,
    reward_amount,
    is_featured,
    is_new,
    is_sponsored,
    expires_at,
    tags
  )
  RETURNING * INTO new_campaign;

  RETURN json_build_object(
    'id', new_campaign.id,
    'title', new_campaign.title,
    'description', new_campaign.description,
    'created_at', new_campaign.created_at
  );
END;
$$;

-- Function to update an existing campaign
CREATE OR REPLACE FUNCTION update_campaign(
  campaign_id uuid,
  title text,
  description text,
  long_description text DEFAULT NULL,
  distribution_details text DEFAULT NULL,
  image_url text DEFAULT NULL,
  reward_amount text DEFAULT '0',
  is_featured boolean DEFAULT false,
  is_new boolean DEFAULT true,
  is_sponsored boolean DEFAULT false,
  expires_at timestamptz DEFAULT NULL,
  tags jsonb DEFAULT '[]'::jsonb
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_campaign campaigns;
BEGIN
  -- Update the campaign
  UPDATE campaigns
  SET
    title = update_campaign.title,
    description = update_campaign.description,
    long_description = update_campaign.long_description,
    distribution_details = update_campaign.distribution_details,
    image_url = update_campaign.image_url,
    reward_amount = update_campaign.reward_amount,
    is_featured = update_campaign.is_featured,
    is_new = update_campaign.is_new,
    is_sponsored = update_campaign.is_sponsored,
    expires_at = update_campaign.expires_at,
    tags = update_campaign.tags,
    updated_at = now()
  WHERE id = campaign_id
    AND user_id = auth.uid()
  RETURNING * INTO updated_campaign;

  IF updated_campaign IS NULL THEN
    RAISE EXCEPTION 'Campaign not found or unauthorized';
  END IF;

  RETURN json_build_object(
    'id', updated_campaign.id,
    'title', updated_campaign.title,
    'description', updated_campaign.description,
    'updated_at', updated_campaign.updated_at
  );
END;
$$;