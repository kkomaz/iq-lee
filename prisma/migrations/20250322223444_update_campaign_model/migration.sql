/*
  Warnings:

  - You are about to drop the column `name` on the `Campaign` table. All the data in the column will be lost.
  - Added the required column `description` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "isAd" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
