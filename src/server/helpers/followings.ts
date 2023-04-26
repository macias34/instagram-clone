import { Context } from "../api/root";

export const getFollowingsByUserID = async (
  userId: string | undefined,
  ctx: Context
) => {
  const followings = await ctx.prisma.follower.findMany({
    where: {
      followerId: userId,
    },
  });

  return followings;
};
