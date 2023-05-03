import { PostContext } from "contexts/post-context";
import { useState, useContext, Dispatch, SetStateAction } from "react";
import { ImageData } from "../use-post-form";

const usePostFormDiscard = (
  setCreatorOpened: Dispatch<SetStateAction<boolean>>,
  images: ImageData[]
) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const discard = () => {
    console.log(images);
    if (images && images.length > 0) {
      images.map((image) => URL.revokeObjectURL(image.src));
    }
    setCreatorOpened(false);
  };

  return {
    discard,
    isDialogOpened,
    setIsDialogOpened,
  };
};

export default usePostFormDiscard;
