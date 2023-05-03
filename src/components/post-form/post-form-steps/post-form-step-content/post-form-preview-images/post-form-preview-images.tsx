import { PostContentStep } from "../post-form-step-content";
import PostFormPreviewImageSlider from "./post-form-preview-image-slider/post-form-preview-image-slider";

const PostFormPreviewImages = ({ images, setImages }: PostContentStep) => {
  return (
    <div className="relative h-[500px] w-full xl:h-auto xl:w-3/5">
      <PostFormPreviewImageSlider setImages={setImages} images={images} />
    </div>
  );
};

export default PostFormPreviewImages;
