import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { credentialsAuthValidationSchema } from "~/pages/auth/sign-up/index";
import { prisma } from "~/server/db";
import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";

export const authRouter = createTRPCRouter({
  signUpWithCredentials: publicProcedure
    .input(credentialsAuthValidationSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, password } = input;

      const exists = await ctx.prisma.user.findFirst({ where: { username } });
      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists. Please try using a different username",
        });
      }

      const user = await ctx.prisma.user.create({
        data: {
          name: username,
          username,
          password: await hash(password, 10),
        },
      });

      if (!user)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unexpected internal error happened.",
        });

      return user;
    }),
});
