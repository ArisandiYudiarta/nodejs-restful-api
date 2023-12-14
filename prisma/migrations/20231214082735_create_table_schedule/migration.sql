-- CreateTable
CREATE TABLE `schedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hour` INTEGER NOT NULL,
    `minute` INTEGER NOT NULL,
    `portion` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `feeder_id` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_feeder_id_fkey` FOREIGN KEY (`feeder_id`) REFERENCES `feeders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
