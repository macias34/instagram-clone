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
import { ArrowLeft } from "lucide-react";
import DiscardPost from "./discard-post";

import Creator from "./creator";

export interface StepProps {
  stepProps: {
    postID: string | null;
    setPostID: Dispatch<SetStateAction<string | null>>;
    images: string[] | null;
    setImages: Dispatch<SetStateAction<string[] | null>>;
  };
}

const PostCreatorDialog: React.FC<{ sessionData: Session }> = ({
  sessionData,
}) => {
  const [creatorOpened, setCreatorOpened] = useState<boolean>(false);

  return (
    <AlertDialog open={creatorOpened}>
      <AlertDialogTrigger onClick={() => setCreatorOpened(true)} asChild>
        <div
          title="Open post creation"
          className="flex cursor-pointer items-center gap-3 rounded-full py-2 pl-2 pr-28 text-base hover:bg-slate-50"
        >
          <BiAddToQueue className="text-3xl" /> Create
        </div>
      </AlertDialogTrigger>
      {creatorOpened && <Creator setCreatorOpened={setCreatorOpened} />}
    </AlertDialog>
  );
};

export default PostCreatorDialog;
