/*
  Warnings:

  - A unique constraint covering the columns `[email,token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Category_colorId_fkey` ON `Category`;

-- DropIndex
DROP INDEX `Meme_colorId_fkey` ON `Meme`;

-- DropIndex
DROP INDEX `VerificationToken_identifier_token_key` ON `VerificationToken`;

-- AlterTable
ALTER TABLE `VerificationToken` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`identifier`);

-- CreateIndex
CREATE UNIQUE INDEX `VerificationToken_email_token_key` ON `VerificationToken`(`email`, `token`);
