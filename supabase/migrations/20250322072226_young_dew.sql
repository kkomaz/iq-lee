/*
  # Create campaign management functions
  
  This migration adds two functions:
  1. create_campaign - Creates a new campaign for the authenticated user
  2. update_campaign - Updates an existing campaign owned by the authenticated user
  
  Both functions:
  - Use JSONB for flexible parameter handling
  - Include proper error handling
  - Enforce user ownership
  - Return standardized JSON responses
*/

-- Function to create a new campaign
CREATE OR REPLACE FUNCTION create_campaign(payload jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_campaign campaigns;
BEGIN
  -- Validate required fields
  IF payload->>'title' IS NULL THEN
    RAISE EXCEPTION 'Title is required';
  END IF;

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
    COALESCE(payload->'tags', '[]'::jsonb)
  )
  RETURNING * INTO new_campaign;

  -- Return standardized response
  RETURN jsonb_build_object(
    'id', new_campaign.id,
    'title', new_campaign.title,
    'description', new_campaign.description,
    'created_at', new_campaign.created_at
  );
EXCEPTION
  WHEN others THEN
    RAISE EXCEPTION 'Error creating campaign: %', SQLERRM;
END;
$$;

-- Function to update an existing campaign
CREATE OR REPLACE FUNCTION update_campaign(payload jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_campaign campaigns;
BEGIN
  -- Validate required fields
  IF payload->>'campaign_id' IS NULL THEN
    RAISE EXCEPTION 'Campaign ID is required';
  END IF;

  IF payload->>'title' IS NULL THEN
    RAISE EXCEPTION 'Title is required';
  END IF;

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
    tags = COALESCE(payload->'tags', tags),
    updated_at = now()
  WHERE id = (payload->>'campaign_id')::uuid
    AND user_id = auth.uid()
  RETURNING * INTO updated_campaign;

  -- Check if campaign was found and user is authorized
  IF updated_campaign IS NULL THEN
    RAISE EXCEPTION 'Campaign not found or unauthorized';
  END IF;

  -- Return standardized response
  RETURN jsonb_build_object(
    'id', updated_campaign.id,
    'title', updated_campaign.title,
    'description', updated_campaign.description,
    'updated_at', updated_campaign.updated_at
  );
EXCEPTION
  WHEN others THEN
    RAISE EXCEPTION 'Error updating campaign: %', SQLERRM;
END;
$$;