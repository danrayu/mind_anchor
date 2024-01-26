/*
  Warnings:

  - Added the required column `indexInCollection` to the `CollectionMeme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CollectionMeme` ADD COLUMN `indexInCollection` INTEGER NOT NULL;
