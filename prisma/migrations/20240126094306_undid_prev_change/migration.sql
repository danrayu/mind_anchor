/*
  Warnings:

  - You are about to drop the column `authorId` on the `CollectionMeme` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `CollectionMeme` DROP FOREIGN KEY `CollectionMeme_authorId_fkey`;

-- AlterTable
ALTER TABLE `CollectionMeme` DROP COLUMN `authorId`;
