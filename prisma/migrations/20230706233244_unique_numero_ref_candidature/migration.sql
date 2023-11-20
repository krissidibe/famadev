/*
  Warnings:

  - A unique constraint covering the columns `[numeroRef]` on the table `Candidature` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Candidature_numeroRef_key` ON `Candidature`(`numeroRef`);
