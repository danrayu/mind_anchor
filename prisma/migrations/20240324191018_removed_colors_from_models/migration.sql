/*
  Warnings:

  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_colorId_fkey`;

-- DropForeignKey
ALTER TABLE `Meme` DROP FOREIGN KEY `Meme_colorId_fkey`;

-- DropTable
DROP TABLE `Color`;
