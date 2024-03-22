-- AlterTable
ALTER TABLE `Account` MODIFY `providerAccountId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `hashedPassword` VARCHAR(191) NULL;
