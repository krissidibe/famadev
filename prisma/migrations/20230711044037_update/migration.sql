-- AlterTable
ALTER TABLE `Candidature` ADD COLUMN `canEdit` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `orderOfMagistrates` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Competition` ADD COLUMN `orderOfMagistrates` BOOLEAN NULL DEFAULT false;
