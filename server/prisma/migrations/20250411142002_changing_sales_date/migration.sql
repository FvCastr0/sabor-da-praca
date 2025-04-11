/*
  Warnings:

  - The primary key for the `salesDate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `salesDate` table. All the data in the column will be lost.
  - You are about to drop the `sale` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[day,month,year]` on the table `salesDate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `_id` to the `salesDate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `sale_salesDateId_fkey`;

-- AlterTable
ALTER TABLE `salesDate` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`_id`);

-- DropTable
DROP TABLE `sale`;

-- CreateTable
CREATE TABLE `Sale` (
    `_id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `value` DOUBLE NOT NULL,
    `salesDateId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `salesDate_day_month_year_key` ON `salesDate`(`day`, `month`, `year`);

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_salesDateId_fkey` FOREIGN KEY (`salesDateId`) REFERENCES `salesDate`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
