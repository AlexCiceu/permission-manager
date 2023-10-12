/*
  Warnings:

  - You are about to drop the column `companyId` on the `Office` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Office" DROP CONSTRAINT "Office_companyId_fkey";

-- AlterTable
ALTER TABLE "Office" DROP COLUMN "companyId";
