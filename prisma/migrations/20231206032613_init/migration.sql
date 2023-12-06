/*
  Warnings:

  - The `updatedAt` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `roles` DROP COLUMN `updatedAt`,
    ADD COLUMN `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0);
