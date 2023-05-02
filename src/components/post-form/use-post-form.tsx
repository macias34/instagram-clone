import { useEffect, useState } from "react";

export interface ImageData {
  name: string;
  file?: File;
  src: string;
}

const usePostForm = (images: ImageData[]) => {
  const [view, setView] = useState<"images-upload" | "post-content">(
    "post-content"
  );

  const [isShareButtonDisabled, setIsShareButtonDisabled] = useState(false);

  useEffect(() => {
    if (images && images.length > 0) setView("post-content");
    else setView("images-upload");
  }, [images]);

  return {
    view,
    setView,
    isShareButtonDisabled,
    setIsShareButtonDisabled,
  };
};

export default usePostForm;
