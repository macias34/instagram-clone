import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const likeRouter = createTRPCRouter({
  toggleLikePostById: protectedProcedure
    .input(z.string().cuid())
    .mutation(async ({ input, ctx }) => {
      const id = input;

      const likeExists = await ctx.prisma.like.findFirst({
        where: {
          postId: id,
          userId: ctx.session.user.id,
        },
      });

      if (likeExists) {
        await ctx.prisma.like
          .delete({
            where: {
              id: likeExists.id,
            },
          })
          .catch(() => {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Something went wrong while trying to unlike the post.",
            });
          });
        return;
      }

      const like = await ctx.prisma.like.create({
        data: {
          postId: id,
          userId: ctx.session.user.id,
        },
      });

      if (!like) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while trying to like the post.",
        });
      }

      return like;
    }),
});
