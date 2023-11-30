/*
  Warnings:

  - You are about to drop the column `files` on the `roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Results` ADD COLUMN `files` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `files`;
