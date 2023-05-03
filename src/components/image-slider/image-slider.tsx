import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import useImageSlider from "~/components/image-slider/use-image-slider";
import { ImageData } from "../post-form/use-post-form";

interface ImageSliderProps {
  images: ImageData[];
}

const ImageSlider: FC<ImageSliderProps> = ({ images }) => {
  const { currentImage, nextImage, prevImage, canGoNextImage, canGoPrevImage } =
    useImageSlider(images);

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
          sizes="100%"
          fill
        />
      ))}
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

export default ImageSlider;
