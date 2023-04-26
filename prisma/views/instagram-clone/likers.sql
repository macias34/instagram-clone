SELECT
  `instagram-clone`.`Like`.`id` AS `id`,
  `instagram-clone`.`Like`.`postId` AS `postId`,
  `instagram-clone`.`userdetails`.`id` AS `userId`,
  `instagram-clone`.`userdetails`.`username` AS `username`,
  `instagram-clone`.`userdetails`.`name` AS `name`,
  `instagram-clone`.`userdetails`.`bio` AS `bio`,
  `instagram-clone`.`userdetails`.`image` AS `image`,
  `instagram-clone`.`Like`.`createdAt` AS `createdAt`,
  `instagram-clone`.`Like`.`updatedAt` AS `updatedAt`
FROM
  (
    `instagram-clone`.`userdetails`
    JOIN `instagram-clone`.`Like` ON(
      (
        `instagram-clone`.`userdetails`.`id` = `instagram-clone`.`Like`.`userId`
      )
    )
  )