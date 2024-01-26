/*
  Warnings:

  - Added the required column `authorId` to the `CollectionMeme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CollectionMeme` ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CollectionMeme` ADD CONSTRAINT `CollectionMeme_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
