SELECT
  `instagram-clone`.`Comment`.`id` AS `id`,
  `instagram-clone`.`Comment`.`postId` AS `postId`,
  `instagram-clone`.`userdetails`.`id` AS `userId`,
  `instagram-clone`.`userdetails`.`username` AS `username`,
  `instagram-clone`.`userdetails`.`name` AS `name`,
  `instagram-clone`.`userdetails`.`bio` AS `bio`,
  `instagram-clone`.`userdetails`.`image` AS `image`,
  `instagram-clone`.`Comment`.`content` AS `content`,
  `instagram-clone`.`Comment`.`createdAt` AS `createdAt`,
  `instagram-clone`.`Comment`.`updatedAt` AS `updatedAt`
FROM
  (
    (
      `instagram-clone`.`userdetails`
      JOIN `instagram-clone`.`Comment` ON(
        (
          `instagram-clone`.`userdetails`.`id` = `instagram-clone`.`Comment`.`userId`
        )
      )
    )
    JOIN `instagram-clone`.`Post` ON(
      (
        `instagram-clone`.`Post`.`id` = `instagram-clone`.`Comment`.`postId`
      )
    )
  )