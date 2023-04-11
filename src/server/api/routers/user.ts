import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUserPublicDataByUsername: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const username = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          username: true,
          posts: true,
          followers: true,
          bio: true,
          image: true,
          name: true,
          id: true,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User with this s doesn't exist.",
        });

      const retrievedFollowings = await ctx.prisma.follower.findMany({
        where: {
          followerId: user.id,
        },
      });

      const followerIds = user.followers.map((follower) => follower.followerId);
      const followingIds = retrievedFollowings.map(
        (following) => following.followedId
      );

      const followers = await ctx.prisma.user.findMany({
        where: {
          id: {
            in: followerIds,
          },
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          followers: {
            select: {
              followerId: true,
            },
          },
        },
      });

      const followings = await ctx.prisma.user.findMany({
        where: {
          id: {
            in: followingIds,
          },
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          followers: {
            select: {
              followerId: true,
            },
          },
        },
      });

      return {
        ...user,
        followers,
        followings,
      };
    }),

  toggleFollowByUserID: protectedProcedure
    .input(z.string().cuid())
    .mutation(async ({ input, ctx }) => {
      const id = input;

      const followExists = await ctx.prisma.follower.findFirst({
        where: {
          followedId: id,
          followerId: ctx.session.user.id,
        },
      });

      if (followExists) {
        const removeFollow = await ctx.prisma.follower.delete({
          where: {
            id: followExists?.id,
          },
        });

        if (!removeFollow) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong while trying to unfollow.",
          });
        }

        return;
      }

      const follow = await ctx.prisma.follower.create({
        data: {
          followedId: id,
          followerId: ctx.session.user.id,
        },
      });

      if (!follow) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while trying to follow.",
        });
      }
      return {
        follow,
      };
    }),
});
