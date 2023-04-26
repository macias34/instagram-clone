import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { commentRouter } from "./routers/comment";
import { likeRouter } from "./routers/like";
import { homeRouter } from "./routers/home";
import { Session } from "next-auth";
import { Prisma, PrismaClient } from "@prisma/client";

export interface Context {
  session: Session | null;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  post: postRouter,
  comment: commentRouter,
  like: likeRouter,
  home: homeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
