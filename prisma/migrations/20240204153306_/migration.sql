/*
  Warnings:

  - You are about to drop the column `config` on the `Mindscape` table. All the data in the column will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CollectionMeme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CollectionToMindscape` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Collection` DROP FOREIGN KEY `Collection_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `CollectionMeme` DROP FOREIGN KEY `CollectionMeme_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `CollectionMeme` DROP FOREIGN KEY `CollectionMeme_memeId_fkey`;

-- DropForeignKey
ALTER TABLE `_CollectionToMindscape` DROP FOREIGN KEY `_CollectionToMindscape_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CollectionToMindscape` DROP FOREIGN KEY `_CollectionToMindscape_B_fkey`;

-- AlterTable
ALTER TABLE `Mindscape` DROP COLUMN `config`;

-- DropTable
DROP TABLE `Collection`;

-- DropTable
DROP TABLE `CollectionMeme`;

-- DropTable
DROP TABLE `_CollectionToMindscape`;

-- CreateTable
CREATE TABLE `MindscapeMeme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `indexInMindscape` INTEGER NOT NULL,
    `memeId` INTEGER NOT NULL,
    `mindscapeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MindscapeMeme` ADD CONSTRAINT `MindscapeMeme_memeId_fkey` FOREIGN KEY (`memeId`) REFERENCES `Meme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MindscapeMeme` ADD CONSTRAINT `MindscapeMeme_mindscapeId_fkey` FOREIGN KEY (`mindscapeId`) REFERENCES `Mindscape`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
