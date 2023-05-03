import { useFormikContext } from "formik";
import useImageSlider from "~/components/image-slider/use-image-slider";
import { ImageData } from "~/components/post-form/use-post-form";
import { Dispatch, SetStateAction } from "react";

interface UsePostFormPreviewImagesProps {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
  currentImage: number;
  goToImage: (index: number) => void;
}

const usePostFormPreviewImages = ({
  images,
  setImages,
  currentImage,
  goToImage,
}: UsePostFormPreviewImagesProps) => {
  const { setFieldValue } = useFormikContext();

  const removeImage = () => {
    const imageToRemove = images[currentImage];
    setImages((prevState) =>
      prevState.filter((image) => image.src !== imageToRemove?.src)
    );
    setFieldValue("images", images);

    if (currentImage !== 0) return goToImage(currentImage - 1);
    if (images.length === 2 && currentImage === 0) return goToImage(0);
    else goToImage(currentImage + 1);
  };

  return {
    removeImage,
  };
};

export default usePostFormPreviewImages;
