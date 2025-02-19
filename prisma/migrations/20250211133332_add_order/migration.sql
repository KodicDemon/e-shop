/*
  Warnings:

  - You are about to drop the column `delivereddAt` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivereddAt",
ADD COLUMN     "deliveredAt" TIMESTAMP(6);
