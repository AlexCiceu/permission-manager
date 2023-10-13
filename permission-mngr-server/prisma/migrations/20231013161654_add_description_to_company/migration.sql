-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "description" TEXT,
ALTER COLUMN "website" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
