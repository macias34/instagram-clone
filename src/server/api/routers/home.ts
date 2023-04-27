import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import {
  getFollowingIds,
  getPostsByFollowingIds,
  getPostsWithData,
} from "~/server/helpers/home";
import { TRPCError } from "@trpc/server";

export const homeRouter = createTRPCRouter({
  getBatchPosts: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;

      const followingIds = await getFollowingIds(ctx);
      const posts = await getPostsByFollowingIds({
        followingIds,
        limit,
        ctx,
        cursor,
        mode: "notIn",
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }

      const postsWithData = await getPostsWithData(posts, ctx);

      return {
        posts: postsWithData,
        nextCursor,
      };
    }),

  getBatchFollowersPosts: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;
      const followingIds = await getFollowingIds(ctx);

      const posts = await getPostsByFollowingIds({
        followingIds,
        limit,
        ctx,
        cursor,
        mode: "in",
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (posts.length > limit) {
        const nextItem = posts.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }

      const postsWithData = await getPostsWithData(posts, ctx);

      return {
        posts: postsWithData,
        nextCursor,
      };
    }),

  searchForUsers: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const username = input;

      const users = await ctx.prisma.user.findMany({
        select: {
          bio: true,
          followers: true,
          id: true,
          image: true,
          name: true,
          username: true,
        },
        where: {
          username: {
            contains: username,
          },
        },
        take: 10,
      });

      return users;
    }),
});
