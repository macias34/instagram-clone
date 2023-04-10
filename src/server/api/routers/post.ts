import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { supabase } from "~/server/db";
import { env } from "~/env.mjs";
import { decode } from "base64-arraybuffer";
import { Image } from "@prisma/client";

export const postRouter = createTRPCRouter({
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
      const postID = createId();

      const uploadedImages: Omit<Image, "id" | "createdAt">[] =
        await Promise.all(
          images.map(async (image) => {
            const imagePath = postID + "/" + image.name;
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
              postId: postID,
            };
          })
        );

      const retrievedImages = await ctx.prisma.image.createMany({
        data: uploadedImages,
        skipDuplicates: true,
      });

      console.log(retrievedImages);
    }),
});
