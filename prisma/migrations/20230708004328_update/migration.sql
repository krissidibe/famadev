/*
  Warnings:

  - The primary key for the `Candidature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Candidature` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The required column `idString` was added to the `Candidature` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Candidature` DROP PRIMARY KEY,
    ADD COLUMN `idString` VARCHAR(191) NOT NULL,
    ADD COLUMN `maitrise` VARCHAR(191) NULL DEFAULT '',
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Competition` ADD COLUMN `maitrise` BOOLEAN NULL DEFAULT false;
