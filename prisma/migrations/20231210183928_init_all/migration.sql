/*
  Warnings:

  - Added the required column `fatherName` to the `Candidature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherName` to the `Candidature` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Candidature` ADD COLUMN `fatherName` VARCHAR(191) NOT NULL,
    ADD COLUMN `motherName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `fatherName` VARCHAR(191) NULL,
    MODIFY `motherName` VARCHAR(191) NULL;
