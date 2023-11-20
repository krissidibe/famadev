-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `birthDate` DATE NULL,
    `sexe` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATE NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Competition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NULL,
    `statut` VARCHAR(191) NOT NULL,
    `ageMin` INTEGER NULL,
    `ageMax` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATE NULL,
    `startDateAt` DATE NULL,
    `endDateAt` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NULL,
    `statut` VARCHAR(191) NOT NULL,
    `nina` VARCHAR(191) NOT NULL,
    `certificat` VARCHAR(191) NOT NULL,
    `diplome` VARCHAR(191) NOT NULL,
    `diplomeNumber` VARCHAR(191) NOT NULL,
    `placeOfGraduation` VARCHAR(191) NOT NULL,
    `countryOfGraduation` VARCHAR(191) NOT NULL,
    `study` VARCHAR(191) NOT NULL,
    `speciality` VARCHAR(191) NOT NULL,
    `def` VARCHAR(191) NULL,
    `bac` VARCHAR(191) NULL,
    `licence` VARCHAR(191) NULL,
    `master` VARCHAR(191) NULL,
    `endDateAt` DATE NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATE NULL,
    `authorId` INTEGER NOT NULL,
    `competitionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Candidature` ADD CONSTRAINT `Candidature_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Candidature` ADD CONSTRAINT `Candidature_competitionId_fkey` FOREIGN KEY (`competitionId`) REFERENCES `Competition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
