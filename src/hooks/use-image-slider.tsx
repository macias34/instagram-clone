import { useState } from "react";

const useImageSlider = (images: any[]) => {
  const imagesLength = images.length;
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prevState) => prevState + 1);
  const prevImage = () => setCurrentImage((prevState) => prevState - 1);

  const canGoNextImage = currentImage < imagesLength - 1;
  const canGoPrevImage = currentImage !== 0;

  const goToImage = (index: number) => {
    if (index >= imagesLength) return;
    setCurrentImage(index);
  };

  return {
    currentImage,
    nextImage,
    prevImage,
    canGoNextImage,
    canGoPrevImage,
    goToImage,
  };
};

export default useImageSlider;
