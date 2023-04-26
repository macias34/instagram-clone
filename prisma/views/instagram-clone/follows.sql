SELECT
  `instagram-clone`.`Follower`.`id` AS `id`,
  `instagram-clone`.`Follower`.`followedId` AS `followedId`,
  `instagram-clone`.`userdetails`.`id` AS `userId`,
  `instagram-clone`.`userdetails`.`username` AS `username`,
  `instagram-clone`.`userdetails`.`name` AS `name`,
  `instagram-clone`.`userdetails`.`bio` AS `bio`,
  `instagram-clone`.`userdetails`.`image` AS `image`,
  `instagram-clone`.`Follower`.`createdAt` AS `createdAt`,
  `instagram-clone`.`Follower`.`updatedAt` AS `updatedAt`
FROM
  (
    `instagram-clone`.`userdetails`
    JOIN `instagram-clone`.`Follower` ON(
      (
        `instagram-clone`.`userdetails`.`id` = `instagram-clone`.`Follower`.`followerId`
      )
    )
  )