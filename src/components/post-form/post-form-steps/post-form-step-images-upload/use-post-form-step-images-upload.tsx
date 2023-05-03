import { useFormikContext } from "formik";
import { useToast } from "~/hooks/use-toast";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { createKey } from "next/dist/shared/lib/router/router";
import { ImageData } from "../../use-post-form";
import { createUniqueImageObject } from "./helpers/create-unique-image-object";

const usePostFormStepImagesUpload = (
  setImages: Dispatch<SetStateAction<ImageData[]>>
) => {
  const { toast } = useToast();
  const { setFieldValue } = useFormikContext();

  const validateImages = (images: File[]) => {
    if (images.length === 0) {
      toast({
        title: "No images were selected",
        description: "You need to select at least one image.",
        duration: 3000,
      });
      return false;
    }

    if (images.length > 10) {
      toast({
        title: "Too many images selected",
        description: "You can select up to 10 images per post.",
        duration: 3000,
        variant: "destructive",
      });
      return false;
    }

    const isExtValid = images.every((image) =>
      image.name.match(/\.(jpg|jpeg|png|gif)$/i)
    );

    if (!isExtValid) {
      toast({
        title: "Not supported image format",
        description: "Images must be jpg, jpeg, png or gif.",
        duration: 3000,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const uploadPhotos = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const images = [...fileList];
    const areImagesValid = validateImages(images);

    if (areImagesValid) {
      images.map(async (image) => {
        const imageData = createUniqueImageObject(image);

        setImages((prevState) =>
          prevState ? [...prevState, imageData] : [imageData]
        );
        setFieldValue("images", images);
      });
    }
  };

  return {
    uploadPhotos,
  };
};

export default usePostFormStepImagesUpload;
