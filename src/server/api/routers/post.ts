import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Image, Post } from "@prisma/client";
import { addImagesToPost } from "~/server/helpers/post";

export const postRouter = createTRPCRouter({
  getPostById: publicProcedure
    .input(z.string().cuid())
    .query(async ({ input, ctx }) => {
      const id = input;

      const post = await ctx.prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          images: true,
          likes: true,
          comments: true,
          author: true,
        },
      });

      if (!post)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post with this id doesn't exist.",
        });

      const author = await ctx.prisma.user.findUnique({
        where: {
          id: post.authorId,
        },

        select: {
          name: true,
          username: true,
          image: true,
          posts: true,
          followers: true,
          id: true,
        },
      });

      if (!author) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Author of this post wasn't found.",
        });
      }

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

      const description: (typeof comments)[0] = {
        commentAuthor: author,
        content: post.caption,
        id: post.id,
        postId: post.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        userId: post.authorId,
      };

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
        author,
        comments: [description, ...comments],
        likers,
      };
    }),

  getPostsByUsername: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const username = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User with this username doesn't exist.",
        });

      const posts = await ctx.prisma.post.findMany({
        where: {
          authorId: user.id,
        },
        select: {
          id: true,
          caption: true,
          images: true,
          likes: true,
          comments: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return posts.map((post) => {
        return {
          ...post,
          author: username,
        };
      });
    }),

  createPost: protectedProcedure
    .input(
      z.object({
        images: z
          .object({
            src: z.string(),
            name: z.string(),
          })
          .array(),

        caption: z.string().max(2200),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { images, caption } = input;

      if (images.length > 10) {
        throw new TRPCError({
          code: "PAYLOAD_TOO_LARGE",
          message: "Your post can have up to 10 images",
        });
      }

      if (images.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Post should contain at least 1 image",
        });
      }

      const post = await ctx.prisma.post.create({
        data: {
          caption,
          authorId: ctx.session.user.id,
          likes: {
            create: [],
          },
          comments: {
            create: [],
          },
        },
      });

      const postWithImages = await addImagesToPost({ images, post, ctx });

      return postWithImages;
    }),

  editPost: protectedProcedure
    .input(
      z.object({
        postId: z.string().cuid(),
        images: z
          .object({
            src: z.string(),
            name: z.string(),
          })
          .array(),

        caption: z.string().max(2200),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { images, caption, postId } = input;

      if (images.length > 10) {
        throw new TRPCError({
          code: "PAYLOAD_TOO_LARGE",
          message: "Your post can have up to 10 images",
        });
      }

      if (images.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Post should contain at least 1 image",
        });
      }

      const post = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          images: true,
        },
      });

      if (!post)
        new TRPCError({
          code: "NOT_FOUND",
          message: "Post couldn't be found.",
        });

      if (post?.authorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You're not authorized to do that.",
        });
      }

      const imagesToUpload = images.filter((image) =>
        image.src.includes("data:")
      );

      const imagesToRemove = post?.images.filter((postImage) => {
        const imageSrcs = images.map((image) => image.src);

        if (!imageSrcs.includes(postImage.src)) {
          return postImage;
        }
      });

      if (imagesToRemove && imagesToRemove.length > 0) {
        await ctx.prisma.image
          .deleteMany({
            where: {
              id: {
                in: imagesToRemove.map((image) => image.id),
              },
            },
          })
          .catch(
            () =>
              new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Couldn't delete images from post.",
              })
          );
      }

      const postWithImages = await addImagesToPost({
        images: imagesToUpload,
        post: post as Post,
        ctx,
      });

      return postWithImages;
    }),

  deletePostById: protectedProcedure
    .input(z.string().cuid())
    .mutation(async ({ input, ctx }) => {
      const postId = input;

      const post = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post with this id couldn't be found.",
        });
      }

      if (post.authorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You're not authorized to do that.",
        });
      }

      await ctx.prisma
        .$transaction([
          ctx.prisma.like.deleteMany({
            where: {
              postId,
            },
          }),
          ctx.prisma.comment.deleteMany({
            where: {
              postId,
            },
          }),
          ctx.prisma.image.deleteMany({
            where: {
              postId,
            },
          }),
          ctx.prisma.post.delete({
            where: {
              id: postId,
            },
          }),
        ])
        .catch(
          () =>
            new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Something went wrong while deleting the post",
            })
        );
    }),
});
