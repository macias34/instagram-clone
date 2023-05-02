import { useState, ChangeEvent } from "react";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import Image from "next/image";
import { ImageData } from "../../../../post-create/post-create";
import { PostContentStep } from "../post-form-step-content";
import { useFormikContext } from "formik";
import useImageSlider from "~/hooks/use-image-slider";

const PostFormPreviewImages = ({ images, setImages }: PostContentStep) => {
  const {
    currentImage,
    nextImage,
    prevImage,
    canGoNextImage,
    canGoPrevImage,
    goToImage,
  } = useImageSlider(images);
  const { setFieldValue } = useFormikContext();

  const removePhoto = () => {
    const imageToRemove = images[currentImage];
    setImages((prevState) =>
      prevState.filter((image) => image.src !== imageToRemove?.src)
    );
    setFieldValue("images", images);

    if (currentImage !== 0) goToImage(currentImage - 1);
    else goToImage(currentImage + 1);
  };

  return (
    <div className="relative h-[500px] w-full xl:h-auto xl:w-3/5">
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          priority
          alt="Preview image"
          style={{ objectFit: "cover" }}
          className={`${
            currentImage !== index && "invisible"
          } brightness-110 xl:rounded-bl-lg`}
          fill
        />
      ))}

      <button
        type="button"
        onClick={removePhoto}
        className="absolute left-2 top-2 flex h-8 w-8 cursor-pointer  items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] text-white transition hover:bg-[rgba(0,0,0,0.5)]"
      >
        <Trash size={20} />
      </button>

      {canGoNextImage && (
        <button
          type="button"
          onClick={nextImage}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ChevronRight className="text-white" />
        </button>
      )}

      {canGoPrevImage && (
        <button
          type="button"
          onClick={prevImage}
          className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ChevronLeft className="text-white" />
        </button>
      )}
    </div>
  );
};

export default PostFormPreviewImages;
