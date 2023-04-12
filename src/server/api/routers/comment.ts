import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const commentRouter = createTRPCRouter({
  commentPostById: protectedProcedure
    .input(z.object({ id: z.string().cuid(), content: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const { id, content } = input;

      const comment = await ctx.prisma.comment.create({
        data: {
          content,
          postId: id,
          userId: ctx.session.user.id,
        },
      });

      if (!comment) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while trying to add comment.",
        });
      }

      return comment;
    }),

  deleteCommentById: protectedProcedure
    .input(z.string().cuid())
    .mutation(async ({ input, ctx }) => {
      const commentId = input;

      const comment = await ctx.prisma.comment.findUnique({
        where: {
          id: commentId,
        },
      });

      if (comment?.userId === ctx.session.user.id)
        await ctx.prisma.comment
          .delete({ where: { id: commentId } })
          .catch((err) => {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Unexpected error happened while deleting comment.",
            });
          });
    }),
});
