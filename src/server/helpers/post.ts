import { Image, Post } from "@prisma/client";
import { RouterInputs, RouterOutputs } from "~/utils/api";
import { Context } from "../api/root";
import { supabase } from "../db";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";

interface AddImagesToPost {
  images: {
    name: string;
    src: string;
  }[];
  post: Post;
  ctx: Context;
  caption?: string;
}

export const addImagesToPost = async ({
  images,
  post,
  caption,
  ctx,
}: AddImagesToPost) => {
  const uploadedImages: Omit<Image, "id" | "createdAt">[] = await Promise.all(
    images.map(async (image) => {
      const imagePath = post.id + "/" + image.name;
      const imageBuffer = Buffer.from(
        image.src.replace("data:", "").replace(/^.+,/, ""),
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
        name: image.name,
      };
    })
  );

  const retrievedImages: Image[] = await Promise.all(
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
      caption: caption ? caption : post.caption,
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
};
