import { useState, ChangeEvent } from "react";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import Image from "next/image";
import { ImageData } from "../../creator";
import { PostContentStep } from "../post-content";
import { useFormikContext } from "formik";

const PreviewImages = ({ images, setImages }: PostContentStep) => {
  const [currentPreviewedImage, setCurrentPreviewedImage] = useState(0);
  const { setFieldValue } = useFormikContext();

  const removePhoto = () => {
    const imageToRemove = images[currentPreviewedImage];
    setImages((prevState) =>
      prevState.filter((image) => image.src !== imageToRemove?.src)
    );
    setFieldValue("images", images);

    if (currentPreviewedImage !== 0)
      setCurrentPreviewedImage(currentPreviewedImage - 1);
    else setCurrentPreviewedImage(currentPreviewedImage + 1);
  };

  return (
    <div className="relative w-3/5">
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          priority
          alt="Preview image"
          style={{ objectFit: "cover" }}
          className={`${
            currentPreviewedImage !== index && "invisible"
          } rounded-bl-lg brightness-110`}
          fill
        />
      ))}

      <button
        type="button"
        onClick={removePhoto}
        className="absolute left-2 top-2 flex h-8 w-8 cursor-pointer  items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] text-white transition hover:bg-[rgba(0,0,0,0.5)]"
      >
        <Trash size={20} />
      </button>

      {currentPreviewedImage < images.length - 1 && (
        <button
          type="button"
          onClick={() => setCurrentPreviewedImage((prevState) => prevState + 1)}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ChevronRight className="text-white" />
        </button>
      )}

      {currentPreviewedImage !== 0 && (
        <button
          type="button"
          onClick={() => setCurrentPreviewedImage((prevState) => prevState - 1)}
          className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ChevronLeft className="text-white" />
        </button>
      )}
    </div>
  );
};

export default PreviewImages;
