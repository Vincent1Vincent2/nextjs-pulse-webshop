/*
  Warnings:

  - Added the required column `customerId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "customerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isSent" BOOLEAN NOT NULL DEFAULT false;
