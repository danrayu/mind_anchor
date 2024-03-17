-- AlterTable
ALTER TABLE `Category` ADD COLUMN `colorId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
