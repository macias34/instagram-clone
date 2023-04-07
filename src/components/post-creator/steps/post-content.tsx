import { StepProps } from "../post-creator-dialog";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const PostContentStep = ({ stepProps }: StepProps) => {
  const { postID, images } = stepProps;
  const [currentPreviewedImage, setCurrentPreviewedImage] = useState(0);

  if (images && images.length > 0)
    return (
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <Image
            src={image}
            priority
            alt="Preview image"
            style={{ objectFit: "cover" }}
            className={`${
              currentPreviewedImage !== index && "invisible"
            } brightness-110`}
            fill
          />
        ))}

        {currentPreviewedImage < images.length - 1 && (
          <div
            onClick={() =>
              setCurrentPreviewedImage((prevState) => prevState + 1)
            }
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
          >
            <ChevronRight className="text-white" />
          </div>
        )}

        {currentPreviewedImage !== 0 && (
          <div
            onClick={() =>
              setCurrentPreviewedImage((prevState) => prevState - 1)
            }
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
          >
            <ChevronLeft className="text-white" />
          </div>
        )}
      </div>
    );

  return <div />;
};

export default PostContentStep;
