/*
  Warnings:

  - Made the column `yearId` on table `month` required. This step will fail if there are existing NULL values in that column.
  - Made the column `monthId` on table `sale` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `month` DROP FOREIGN KEY `month_yearId_fkey`;

-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `sale_monthId_fkey`;

-- DropIndex
DROP INDEX `month_yearId_fkey` ON `month`;

-- DropIndex
DROP INDEX `sale_monthId_fkey` ON `sale`;

-- AlterTable
ALTER TABLE `month` MODIFY `yearId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sale` MODIFY `monthId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `month` ADD CONSTRAINT `month_yearId_fkey` FOREIGN KEY (`yearId`) REFERENCES `year`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_monthId_fkey` FOREIGN KEY (`monthId`) REFERENCES `month`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
