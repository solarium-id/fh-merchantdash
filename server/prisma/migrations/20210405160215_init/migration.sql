-- CreateTable
CREATE TABLE `MstUser` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userid` VARCHAR(100) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `nickname` VARCHAR(50) NOT NULL DEFAULT '',
    `email` VARCHAR(100) NOT NULL,
    `status` INTEGER NOT NULL,
    `createddate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
UNIQUE INDEX `MstUser.userid_unique`(`userid`),
UNIQUE INDEX `MstUser.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MstMerchantCat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MstMerchantTes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `merchantname` VARCHAR(100) NOT NULL,
    `merchantaddr` VARCHAR(100) NOT NULL,
    `merchantph` VARCHAR(100) NOT NULL,
    `merchantemail` VARCHAR(100) NOT NULL,
    `merchantpic` VARCHAR(100) NOT NULL,
    `categoryid` INTEGER NOT NULL,
    `ownername` VARCHAR(100) NOT NULL,
    `ownerhp` VARCHAR(100) NOT NULL,
    `owneremail` VARCHAR(100) NOT NULL,
    `fotoktp` VARCHAR(100) NOT NULL,
    `reservation` INTEGER NOT NULL DEFAULT 0,
    `addeddate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MstMerchantTes` ADD FOREIGN KEY (`categoryid`) REFERENCES `MstMerchantCat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
