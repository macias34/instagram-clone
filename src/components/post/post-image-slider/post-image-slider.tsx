import { PostContext } from "contexts/post-context";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import useImageSlider from "~/hooks/use-image-slider";

const PostImageSlider = () => {
  const { post } = useContext(PostContext)!;
  const { images } = post;

  const { currentImage, nextImage, prevImage, canGoNextImage, canGoPrevImage } =
    useImageSlider(images);

  return (
    <div className={`relative aspect-square w-full`}>
      {images.map((image, index) => (
        <Image
          key={image.id}
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

export default PostImageSlider;
