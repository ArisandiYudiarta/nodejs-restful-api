-- AlterTable
ALTER TABLE `history` ADD COLUMN `hour` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `minute` INTEGER NOT NULL DEFAULT 23;