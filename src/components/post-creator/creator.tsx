import { BiAddToQueue } from "react-icons/bi";
import { Separator } from "../ui/seperator";
import { Session } from "next-auth";
import ImagesUploadStep from "./steps/images-upload";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import PostContentStep from "./steps/post-content";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import DiscardPost from "./discard-post";
import { createId } from "@paralleldrive/cuid2";

const Creator = ({
  setCreatorOpened,
}: {
  setCreatorOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const [view, setView] = useState<"images-upload" | "post-content">(
    "images-upload"
  );

  const [postID, setPostID] = useState<null | string>(createId);
  const [images, setImages] = useState<null | string[]>(null);
  const stepProps = {
    postID,
    setPostID,
    images,
    setImages,
  };

  useEffect(() => {
    if (images && images.length > 0) setView("post-content");
  }, [images]);

  useEffect(() => {
    return () => {
      if (images && images.length > 0) {
        images.map((imageURL) => URL.revokeObjectURL(imageURL));
      }
    };
  }, [images]);

  return (
    <AlertDialogContent
      className={`gap-0 px-0 py-4 transition-all duration-300 ${
        view === "images-upload" ? "max-w-lg" : "max-w-4xl"
      }`}
    >
      <AlertDialogHeader className="relative flex w-full items-center">
        <div
          className={`flex w-full flex-row items-center justify-between px-3
             `}
        >
          <DiscardPost setCreatorOpened={setCreatorOpened} />
          <AlertDialogTitle className="absolute left-1/2 top-0 -translate-x-1/2 text-base">
            Create new post
          </AlertDialogTitle>

          {view === "post-content" && (
            <span className="cursor-pointer font-semibold text-blue-500">
              Share
            </span>
          )}
        </div>
        <Separator className="" />
      </AlertDialogHeader>

      <div className="flex h-[530px] max-w-lg flex-col items-center justify-center gap-7 rounded-md">
        {view === "images-upload" && <ImagesUploadStep stepProps={stepProps} />}
        {view === "post-content" && <PostContentStep stepProps={stepProps} />}
      </div>

      {/*         
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
    </AlertDialogContent>
  );
};

export default Creator;
