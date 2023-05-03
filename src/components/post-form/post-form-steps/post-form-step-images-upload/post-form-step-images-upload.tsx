import { Button } from "~/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { ImageData } from "../../use-post-form";
import usePostFormStepImagesUpload from "./use-post-form-step-images-upload";
import PostFormStepImagesUploadIcon from "./assets/post-form-step-images-upload-icon";

interface PostFormStepImagesUploadProps {
  setImages: Dispatch<SetStateAction<ImageData[]>>;
}

const PostFormStepImagesUpload = ({
  setImages,
}: PostFormStepImagesUploadProps) => {
  const { uploadPhotos } = usePostFormStepImagesUpload(setImages);
  return (
    <>
      <PostFormStepImagesUploadIcon />
      <h1 className="text-xl">Drag photos and videos here</h1>
      <Button className="relative cursor-pointer" variant="accent">
        <input
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
          className="absolute h-full w-full cursor-pointer opacity-0"
          title="Upload photos"
          multiple
          onChange={uploadPhotos}
        />
        Select from computer
      </Button>
    </>
  );
};

export default PostFormStepImagesUpload;
