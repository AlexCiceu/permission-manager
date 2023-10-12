/*
  Warnings:

  - The `permissions` column on the `PermissionTemplate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[templateName]` on the table `PermissionTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('READ', 'WRITE', 'DELETE');

-- AlterTable
ALTER TABLE "PermissionTemplate" ADD COLUMN     "userId" INTEGER,
DROP COLUMN "permissions",
ADD COLUMN     "permissions" "Permissions"[];

-- CreateIndex
CREATE UNIQUE INDEX "PermissionTemplate_templateName_key" ON "PermissionTemplate"("templateName");

-- AddForeignKey
ALTER TABLE "PermissionTemplate" ADD CONSTRAINT "PermissionTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
