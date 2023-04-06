import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUserByID: publicProcedure
    .input(z.object({ id: z.string().cuid("User id must be CUID.") }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User with this s doesn't exist.",
        });

      return {
        name: user.name,
        username: user.username,
        image: user.image,
        id: user.id,
      };
    }),
});
