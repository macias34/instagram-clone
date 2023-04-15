import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

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

      const posts = await ctx.prisma.post.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "asc",
        },
        include: {
          author: {
            select: {
              bio: true,
              followers: true,
              id: true,
              image: true,
              name: true,
              username: true,
              posts: true,
            },
          },
          images: true,
          likes: true,
          comments: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (posts.length > limit) {
        const nextItem = posts.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }
      return {
        posts,
        nextCursor,
      };
    }),
});
