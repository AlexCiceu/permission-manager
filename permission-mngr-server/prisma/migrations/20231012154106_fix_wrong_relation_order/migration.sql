/*
  Warnings:

  - You are about to drop the column `userId` on the `PermissionTemplate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PermissionTemplate" DROP CONSTRAINT "PermissionTemplate_userId_fkey";

-- AlterTable
ALTER TABLE "PermissionTemplate" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissionTemplateId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_permissionTemplateId_fkey" FOREIGN KEY ("permissionTemplateId") REFERENCES "PermissionTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
