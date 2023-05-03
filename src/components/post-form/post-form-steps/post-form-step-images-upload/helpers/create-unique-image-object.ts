import { createKey } from "next/dist/shared/lib/router/router";
import { ImageData } from "~/components/post-form/use-post-form";

export const createUniqueImageObject = (image: File) => {
  const dotIndex = image.name.lastIndexOf(".");
  const uniqueImageName =
    image.name.substring(0, dotIndex) +
    createKey() +
    image.name.substring(dotIndex);
  const uniqueNamedImage = new File([image], uniqueImageName);

  const src = URL.createObjectURL(uniqueNamedImage);
  const imageData: ImageData = {
    name: uniqueNamedImage.name,
    src,
    file: uniqueNamedImage,
  };

  return imageData;
};
