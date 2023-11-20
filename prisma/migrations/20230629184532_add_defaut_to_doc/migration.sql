-- AlterTable
ALTER TABLE `Candidature` MODIFY `def` BOOLEAN NULL DEFAULT false,
    MODIFY `bac` BOOLEAN NULL DEFAULT false,
    MODIFY `licence` BOOLEAN NULL DEFAULT false,
    MODIFY `master1` BOOLEAN NULL DEFAULT false,
    MODIFY `master2` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Competition` MODIFY `bac` BOOLEAN NULL DEFAULT false,
    MODIFY `def` BOOLEAN NULL DEFAULT false,
    MODIFY `licence` BOOLEAN NULL DEFAULT false,
    MODIFY `master1` BOOLEAN NULL DEFAULT false,
    MODIFY `master2` BOOLEAN NULL DEFAULT false;
