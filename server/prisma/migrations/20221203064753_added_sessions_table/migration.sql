-- CreateTable
CREATE TABLE `Sessions` (
    `session_id` VARCHAR(191) NOT NULL,
    `expires` INTEGER NOT NULL,
    `data` MEDIUMTEXT NOT NULL,

    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
