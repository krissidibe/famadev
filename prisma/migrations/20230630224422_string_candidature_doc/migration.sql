/*
  Warnings:

  - You are about to alter the column `def` on the `Candidature` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `bac` on the `Candidature` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `licence` on the `Candidature` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `master1` on the `Candidature` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - You are about to alter the column `master2` on the `Candidature` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Candidature` MODIFY `def` VARCHAR(191) NULL DEFAULT '',
    MODIFY `bac` VARCHAR(191) NULL DEFAULT '',
    MODIFY `licence` VARCHAR(191) NULL DEFAULT '',
    MODIFY `master1` VARCHAR(191) NULL DEFAULT '',
    MODIFY `master2` VARCHAR(191) NULL DEFAULT '';
