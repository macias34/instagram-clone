import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import Image from "next/image";
import { PostContentStep } from "../post-form-step-content";
import { useFormikContext } from "formik";
import useImageSlider from "~/components/image-slider/use-image-slider";
import ImageSlider from "~/components/image-slider/image-slider";

const PostFormPreviewImages = ({ images, setImages }: PostContentStep) => {
  const { currentImage, goToImage } = useImageSlider(images);
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
      <ImageSlider images={images} />
      <button
        type="button"
        onClick={removePhoto}
        className="absolute left-2 top-2 flex h-8 w-8 cursor-pointer  items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] text-white transition hover:bg-[rgba(0,0,0,0.5)]"
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default PostFormPreviewImages;
