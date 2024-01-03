/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mindscape` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToMeme` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Collection` DROP FOREIGN KEY `Collection_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Meme` DROP FOREIGN KEY `Meme_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Meme` DROP FOREIGN KEY `Meme_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `Mindscape` DROP FOREIGN KEY `Mindscape_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToMeme` DROP FOREIGN KEY `_CategoryToMeme_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToMeme` DROP FOREIGN KEY `_CategoryToMeme_B_fkey`;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Collection`;

-- DropTable
DROP TABLE `Meme`;

-- DropTable
DROP TABLE `Mindscape`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `_CategoryToMeme`;
