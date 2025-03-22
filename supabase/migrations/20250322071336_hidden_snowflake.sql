/*
  # Fix RPC functions to use JSON parameters

  1. Changes
    - Update create_campaign to accept a single JSON parameter
    - Update update_campaign to accept a single JSON parameter
    - Improve error handling and validation
*/

-- Function to create a new campaign
CREATE OR REPLACE FUNCTION create_campaign(payload json)
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
    payload->>'title',
    payload->>'description',
    payload->>'long_description',
    payload->>'distribution_details',
    payload->>'image_url',
    COALESCE(payload->>'reward_amount', '0'),
    COALESCE((payload->>'is_featured')::boolean, false),
    COALESCE((payload->>'is_new')::boolean, true),
    COALESCE((payload->>'is_sponsored')::boolean, false),
    NULLIF(payload->>'expires_at', '')::timestamptz,
    COALESCE((payload->>'tags')::jsonb, '[]'::jsonb)
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
CREATE OR REPLACE FUNCTION update_campaign(payload json)
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
    title = payload->>'title',
    description = payload->>'description',
    long_description = payload->>'long_description',
    distribution_details = payload->>'distribution_details',
    image_url = payload->>'image_url',
    reward_amount = COALESCE(payload->>'reward_amount', reward_amount),
    is_featured = COALESCE((payload->>'is_featured')::boolean, is_featured),
    is_new = COALESCE((payload->>'is_new')::boolean, is_new),
    is_sponsored = COALESCE((payload->>'is_sponsored')::boolean, is_sponsored),
    expires_at = NULLIF(payload->>'expires_at', '')::timestamptz,
    tags = COALESCE((payload->>'tags')::jsonb, tags),
    updated_at = now()
  WHERE id = (payload->>'campaign_id')::uuid
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