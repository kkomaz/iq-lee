/*
  Warnings:

  - Added the required column `totalAmount` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN "totalAmount" INTEGER NOT NULL DEFAULT 0;