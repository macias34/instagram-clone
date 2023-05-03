import { useFormikContext } from "formik";
import useImageSlider from "~/components/image-slider/use-image-slider";
import { ImageData } from "~/components/post-form/use-post-form";
import { Dispatch, SetStateAction } from "react";

const usePostFormPreviewImages = (
  images: ImageData[],
  setImages: Dispatch<SetStateAction<ImageData[]>>
) => {
  const { currentImage, goToImage } = useImageSlider(images);
  const { setFieldValue } = useFormikContext();

  const removeImage = () => {
    const imageToRemove = images[currentImage];
    setImages((prevState) =>
      prevState.filter((image) => image.src !== imageToRemove?.src)
    );
    setFieldValue("images", images);

    if (currentImage !== 0) goToImage(currentImage - 1);
    else goToImage(currentImage + 1);
  };

  return {
    removeImage,
  };
};

export default usePostFormPreviewImages;
