/*
  Warnings:

  - You are about to drop the column `monthId` on the `sale` table. All the data in the column will be lost.
  - Added the required column `dayId` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `sale_monthId_fkey`;

-- DropIndex
DROP INDEX `sale_monthId_fkey` ON `sale`;

-- AlterTable
ALTER TABLE `sale` DROP COLUMN `monthId`,
    ADD COLUMN `dayId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `day` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` INTEGER NOT NULL,
    `monthId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `day` ADD CONSTRAINT `day_monthId_fkey` FOREIGN KEY (`monthId`) REFERENCES `month`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_dayId_fkey` FOREIGN KEY (`dayId`) REFERENCES `day`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
