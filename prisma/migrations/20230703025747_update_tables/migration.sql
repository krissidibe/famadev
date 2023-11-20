/*
  Warnings:

  - You are about to drop the column `certificate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Candidature` ADD COLUMN `address` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `birthDateFile` VARCHAR(191) NULL,
    ADD COLUMN `cassierFile` VARCHAR(191) NULL,
    ADD COLUMN `certificatVie` VARCHAR(191) NULL,
    ADD COLUMN `certificatVisite` VARCHAR(191) NULL,
    ADD COLUMN `certificate` VARCHAR(191) NULL,
    ADD COLUMN `diplomeFile` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `ninaFile` VARCHAR(191) NULL,
    ADD COLUMN `number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `certificate`,
    ADD COLUMN `ninaFile` VARCHAR(191) NULL DEFAULT '';
