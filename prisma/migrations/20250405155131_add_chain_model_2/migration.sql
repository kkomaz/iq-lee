-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_chainId_fkey";

-- AlterTable
ALTER TABLE "_CampaignTags" ADD CONSTRAINT "_CampaignTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CampaignTags_AB_unique";

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "Chain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
