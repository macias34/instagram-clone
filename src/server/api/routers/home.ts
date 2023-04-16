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

      const postsWithData = await Promise.all(
        posts.map(async (post) => {
          const commentUserIds = post.comments.map((comment) => comment.userId);
          const commenters = await ctx.prisma.user.findMany({
            where: {
              id: {
                in: commentUserIds,
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

          if (!commenters)
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Unexpected error while getting commenters.",
            });

          const comments = post.comments.map((comment) => {
            return {
              ...comment,
              commentAuthor: commenters.find(
                (commenter) => commenter.id === comment.userId
              ),
            };
          });

          const likerIds = post.likes.map((like) => like.userId);

          const likers = await ctx.prisma.user.findMany({
            where: {
              id: {
                in: likerIds,
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
            ...post,
            comments,
            likers,
          };
        })
      );

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
