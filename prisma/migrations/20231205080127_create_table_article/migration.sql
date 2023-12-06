-- CreateTable
CREATE TABLE `articles` (
    `article_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `tag` VARCHAR(50) NOT NULL,
    `content` VARCHAR(300) NULL,
    `author_name` VARCHAR(100) NULL,
    `photo_url` VARCHAR(300) NULL,

    PRIMARY KEY (`article_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
