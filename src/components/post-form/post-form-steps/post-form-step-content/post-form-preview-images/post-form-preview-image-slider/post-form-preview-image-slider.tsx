import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import Image from "next/image";
import { FC, Dispatch, SetStateAction } from "react";
import useImageSlider from "~/components/image-slider/use-image-slider";
import { ImageData } from "~/components/post-form/use-post-form";
import usePostFormPreviewImages from "../use-post-form-preview-images";

interface PostFormPreviewImageSliderProps {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
}

const PostFormPreviewImageSlider: FC<PostFormPreviewImageSliderProps> = ({
  images,
  setImages,
}) => {
  const {
    currentImage,
    nextImage,
    prevImage,
    canGoNextImage,
    canGoPrevImage,
    goToImage,
  } = useImageSlider(images);

  const { removeImage } = usePostFormPreviewImages({
    images,
    setImages,
    currentImage,
    goToImage,
  });

  return (
    <div className={`relative aspect-square w-full`}>
      {images.map((image, index) => (
        <Image
          key={image.name}
          src={image.src}
          priority
          alt="Preview image"
          style={{ objectFit: "cover" }}
          className={`${
            currentImage !== index && "invisible"
          } -z-10 brightness-110`}
          fill
        />
      ))}
      <button
        type="button"
        onClick={removeImage}
        className="absolute left-2 top-2 flex h-8 w-8 cursor-pointer  items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] text-white transition hover:bg-[rgba(0,0,0,0.5)]"
      >
        <Trash size={20} />
      </button>

      {canGoNextImage && (
        <div
          onClick={nextImage}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ChevronRight className="text-white" />
        </div>
      )}

      {canGoPrevImage && (
        <div
          onClick={prevImage}
          className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ChevronLeft className="text-white" />
        </div>
      )}
    </div>
  );
};

export default PostFormPreviewImageSlider;
