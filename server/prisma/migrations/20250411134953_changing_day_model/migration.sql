/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `day` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `date` on the `day` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `day` DROP COLUMN `date`,
    ADD COLUMN `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `sale` MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `day_date_key` ON `day`(`date`);
