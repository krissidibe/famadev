/*
  Warnings:

  - Added the required column `birthDate` to the `Candidature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Candidature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Candidature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexe` to the `Candidature` table without a default value. This is not possible if the table is not empty.
  - Made the column `startDateAt` on table `Competition` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDateAt` on table `Competition` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Candidature` ADD COLUMN `birthDate` DATE NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `sexe` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Competition` MODIFY `startDateAt` DATE NOT NULL,
    MODIFY `endDateAt` DATE NOT NULL;
