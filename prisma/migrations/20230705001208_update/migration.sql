-- AlterTable
ALTER TABLE `Candidature` ADD COLUMN `message` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `placeBirthDate` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `User` ADD COLUMN `placeBirthDate` VARCHAR(191) NULL DEFAULT '';
