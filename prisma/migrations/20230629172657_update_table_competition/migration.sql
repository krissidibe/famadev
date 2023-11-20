/*
  Warnings:

  - You are about to drop the column `master` on the `Candidature` table. All the data in the column will be lost.
  - You are about to alter the column `def` on the `Candidature` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - You are about to alter the column `bac` on the `Candidature` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - You are about to alter the column `licence` on the `Candidature` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Candidature` DROP COLUMN `master`,
    ADD COLUMN `master1` BOOLEAN NULL,
    ADD COLUMN `master2` BOOLEAN NULL,
    MODIFY `def` BOOLEAN NULL,
    MODIFY `bac` BOOLEAN NULL,
    MODIFY `licence` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `Competition` ADD COLUMN `bac` BOOLEAN NULL,
    ADD COLUMN `def` BOOLEAN NULL,
    ADD COLUMN `licence` BOOLEAN NULL,
    ADD COLUMN `master1` BOOLEAN NULL,
    ADD COLUMN `master2` BOOLEAN NULL;
