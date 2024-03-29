-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Meme` DROP FOREIGN KEY `Meme_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Mindscape` DROP FOREIGN KEY `Mindscape_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `MindscapeScheduleConfig` DROP FOREIGN KEY `MindscapeScheduleConfig_authorId_fkey`;

-- AddForeignKey
ALTER TABLE `Meme` ADD CONSTRAINT `Meme_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mindscape` ADD CONSTRAINT `Mindscape_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MindscapeScheduleConfig` ADD CONSTRAINT `MindscapeScheduleConfig_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
