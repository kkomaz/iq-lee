-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CampaignTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignTags_AB_unique" ON "_CampaignTags"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignTags_B_index" ON "_CampaignTags"("B");

-- Insert the types into the Type table
INSERT INTO "Type" (name, "createdAt", "updatedAt") 
VALUES 
  ('Kaito', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Airdrop', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- AlterTable: Add typeId column and set a default value for existing rows
ALTER TABLE "Campaign" ADD COLUMN "typeId" INTEGER;
UPDATE "Campaign" SET "typeId" = (SELECT id FROM "Type" WHERE name = 'Kaito') WHERE "typeId" IS NULL;
ALTER TABLE "Campaign" ALTER COLUMN "typeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignTags" ADD CONSTRAINT "_CampaignTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignTags" ADD CONSTRAINT "_CampaignTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "Tag" (name, "createdAt", "updatedAt")
VALUES 
  ('DeFi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('NFT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Layer 1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Layer 2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CEX', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Social', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Data', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Gaming', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Infrastructure', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Rumored', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Liquid Staking', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Restaking', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('AI', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Web3 Security', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);