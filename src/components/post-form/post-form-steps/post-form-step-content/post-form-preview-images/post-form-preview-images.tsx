import { Trash } from "lucide-react";
import { PostContentStep } from "../post-form-step-content";
import ImageSlider from "~/components/image-slider/image-slider";
import usePostFormPreviewImages from "./use-post-form-preview-images";

const PostFormPreviewImages = ({ images, setImages }: PostContentStep) => {
  const { removeImage } = usePostFormPreviewImages(images, setImages);

  return (
    <div className="relative h-[500px] w-full xl:h-auto xl:w-3/5">
      <ImageSlider images={images} />
      <button
        type="button"
        onClick={removeImage}
        className="absolute left-2 top-2 flex h-8 w-8 cursor-pointer  items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] text-white transition hover:bg-[rgba(0,0,0,0.5)]"
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default PostFormPreviewImages;
