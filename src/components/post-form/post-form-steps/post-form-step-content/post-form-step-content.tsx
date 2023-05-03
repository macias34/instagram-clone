import { Dispatch, SetStateAction } from "react";
import PostFormPreviewImages from "./post-form-preview-images/post-form-preview-images";
import { Post } from "@prisma/client";
import { ImageData } from "../../use-post-form";
import PostFormCaption from "./post-form-caption/post-form-caption";

export interface PostContentStep {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
  post?: Post;
}

const PostFormStepContent = ({ images, setImages, post }: PostContentStep) => {
  if (images && images.length > 0)
    return (
      <div className="flex h-full w-full flex-col xl:flex-row">
        <PostFormPreviewImages setImages={setImages} images={images} />
        <PostFormCaption post={post} />
      </div>
    );

  return <div />;
};

export default PostFormStepContent;
