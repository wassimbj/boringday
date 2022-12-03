-- CreateTable
CREATE TABLE `SharedTask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `sharedWith` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SharedTask` ADD CONSTRAINT `SharedTask_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharedTask` ADD CONSTRAINT `SharedTask_sharedWith_fkey` FOREIGN KEY (`sharedWith`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
