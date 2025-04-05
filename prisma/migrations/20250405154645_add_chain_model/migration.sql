-- CreateTable
CREATE TABLE "Chain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chain_name_key" ON "Chain"("name");

-- Insert a default chain (optional, for reference)
INSERT INTO "Chain" ("name", "createdAt", "updatedAt")
VALUES ('Unknown', NOW(), NOW());

-- AddColumn as nullable (no NOT NULL or DEFAULT needed since it's optional)
ALTER TABLE "Campaign" ADD COLUMN "chainId" INTEGER;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_chainId_fkey" 
    FOREIGN KEY ("chainId") REFERENCES "Chain"("id") 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;