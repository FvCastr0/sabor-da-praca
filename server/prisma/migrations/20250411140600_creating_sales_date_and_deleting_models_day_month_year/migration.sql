/*
  Warnings:

  - You are about to drop the column `dayId` on the `sale` table. All the data in the column will be lost.
  - You are about to drop the `day` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `month` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `year` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `salesDateId` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `day` DROP FOREIGN KEY `day_monthId_fkey`;

-- DropForeignKey
ALTER TABLE `month` DROP FOREIGN KEY `month_yearId_fkey`;

-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `sale_dayId_fkey`;

-- DropIndex
DROP INDEX `sale_dayId_fkey` ON `sale`;

-- AlterTable
ALTER TABLE `sale` DROP COLUMN `dayId`,
    ADD COLUMN `salesDateId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `day`;

-- DropTable
DROP TABLE `month`;

-- DropTable
DROP TABLE `year`;

-- CreateTable
CREATE TABLE `salesDate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `day` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_salesDateId_fkey` FOREIGN KEY (`salesDateId`) REFERENCES `salesDate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
