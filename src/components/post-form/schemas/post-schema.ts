import { z } from "zod";

export const postSchema = z.object({
  images: z
    .custom<File>()
    .array()
    .min(1, "No images were selected. You need to select at least one image.")
    .max(
      10,
      "Too many images selected. You can select up to 10 images per post."
    )
    .refine(
      (images) =>
        images.every((image) => image.name.match(/\.(jpg|jpeg|png|gif)$/i)),
      "Not supported image format. Images must be jpg, jpeg, png or gif."
    ),
  caption: z
    .string()
    .max(2200, "The caption must be 2200 characters max.")
    .optional(),
});
