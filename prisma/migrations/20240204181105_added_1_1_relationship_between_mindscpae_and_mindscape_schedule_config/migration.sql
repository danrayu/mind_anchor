/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `MindscapeScheduleConfig` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `MindscapeScheduleConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MindscapeScheduleConfig` ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MindscapeScheduleConfig_authorId_key` ON `MindscapeScheduleConfig`(`authorId`);

-- AddForeignKey
ALTER TABLE `MindscapeScheduleConfig` ADD CONSTRAINT `MindscapeScheduleConfig_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
