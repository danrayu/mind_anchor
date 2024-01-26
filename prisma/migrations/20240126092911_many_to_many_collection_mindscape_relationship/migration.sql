-- CreateTable
CREATE TABLE `_CollectionToMindscape` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CollectionToMindscape_AB_unique`(`A`, `B`),
    INDEX `_CollectionToMindscape_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CollectionToMindscape` ADD CONSTRAINT `_CollectionToMindscape_A_fkey` FOREIGN KEY (`A`) REFERENCES `Collection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollectionToMindscape` ADD CONSTRAINT `_CollectionToMindscape_B_fkey` FOREIGN KEY (`B`) REFERENCES `Mindscape`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
