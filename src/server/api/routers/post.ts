import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { supabase } from "~/server/db";
import { env } from "~/env.mjs";
import { Image } from "@prisma/client";

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
        },
      });

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

      return { ...post, author, comments };
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
            file: z.string(),
            name: z.string(),
          })
          .array(),

        caption: z.string().max(2200),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { images, caption } = input;

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

      const uploadedImages: Omit<Image, "id" | "createdAt">[] =
        await Promise.all(
          images.map(async (image) => {
            const imagePath = post.id + "/" + image.name;
            const imageBuffer = Buffer.from(
              image.file.replace("data:", "").replace(/^.+,/, ""),
              "base64"
            );

            const { data, error } = await supabase.storage
              .from("images")
              .upload(imagePath, imageBuffer, { contentType: "image" });

            if (error)
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: error.message,
              });

            return {
              src: env.NEXT_PUBLIC_SUPABASE_IMAGES_URL + data?.path,
              postId: post.id,
            };
          })
        );

      const retrievedImages = await Promise.all(
        uploadedImages.map(
          async (image) => await ctx.prisma.image.create({ data: image })
        )
      );

      if (!retrievedImages)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Something when wrong while adding images to database. Please try again.",
        });

      const postWithImages = await ctx.prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          ...post,
          images: {
            connect: retrievedImages.map((image) => {
              return {
                id: image.id,
              };
            }),
          },
        },
      });

      return postWithImages;
    }),
});
