/*
  Warnings:

  - Added the required column `config` to the `Mindscape` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Mindscape` ADD COLUMN `config` TEXT NOT NULL,
    MODIFY `description` TEXT NOT NULL;
