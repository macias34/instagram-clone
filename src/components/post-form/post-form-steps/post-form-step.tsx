import { FunctionComponent, useContext, Dispatch, SetStateAction } from "react";
import PostFormStepImagesUpload from "./post-form-step-images-upload/post-form-step-images-upload";
import PostFormStepContent from "./post-form-step-content/post-form-step-content";
import { ImageData } from "../use-post-form";
import { PostContextValues } from "contexts/post-context";
import { PostFormContext } from "contexts/post-form-context";

const PostFormStep = () => {
  const { images, setImages, post, view } = useContext(PostFormContext)!;

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-7 rounded-md xl:h-[530px]">
      {view === "images-upload" && (
        <PostFormStepImagesUpload setImages={setImages} />
      )}
      {view === "post-content" && (
        <PostFormStepContent
          setImages={setImages}
          post={post}
          images={images}
        />
      )}
    </div>
  );
};

export default PostFormStep;
