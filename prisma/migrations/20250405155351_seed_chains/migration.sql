-- Insert chains into the Chain table
INSERT INTO "Chain" ("name", "createdAt", "updatedAt")
VALUES 
  ('Initia', NOW(), NOW()),
  ('Corn', NOW(), NOW()),
  ('Sophon', NOW(), NOW()),
  ('Somnia', NOW(), NOW()),
  ('Wayfinder', NOW(), NOW()),
  ('XION', NOW(), NOW()),
  ('Openledger', NOW(), NOW()),
  ('Multipil', NOW(), NOW()),
  ('Mantle', NOW(), NOW()),
  ('Sei', NOW(), NOW()),
  ('DefiDapp', NOW(), NOW()),
  ('Paradex', NOW(), NOW()),
  ('Infinex', NOW(), NOW()),
  ('Allora', NOW(), NOW()),
  ('Lombard', NOW(), NOW()),
  ('Quai', NOW(), NOW()),
  ('Skate', NOW(), NOW()),
  ('Polkadot', NOW(), NOW()),
  ('Unknown', NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- Update existing campaigns to use the Polkadot chain (adjust as needed)
UPDATE "Campaign"
SET "chainId" = (SELECT "id" FROM "Chain" WHERE "name" = 'Polkadot')
WHERE "chainId" IS NULL OR "chainId" = (SELECT "id" FROM "Chain" WHERE "name" = 'Unknown');