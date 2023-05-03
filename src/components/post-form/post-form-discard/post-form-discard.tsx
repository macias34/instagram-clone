import { ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogFooter,
} from "../../ui/alert-dialog";
import { Dispatch, SetStateAction, useState } from "react";
import usePostFormDiscard from "./use-post-form-discard";
import { ImageData } from "../use-post-form";

interface PostFormDiscardProps {
  setCreatorOpened: Dispatch<SetStateAction<boolean>>;
  images: ImageData[];
}

const PostFormDiscard = ({
  setCreatorOpened,
  images,
}: PostFormDiscardProps) => {
  const { discard, isDialogOpened, setIsDialogOpened } = usePostFormDiscard(
    setCreatorOpened,
    images
  );

  return (
    <AlertDialog open={isDialogOpened}>
      <AlertDialogTrigger onClick={() => setIsDialogOpened(true)}>
        <div title="Discard post" className="cursor-pointer">
          <ArrowLeft />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm p-0 pt-7 max-xl:top-1/2 max-xl:-translate-y-1/2 max-xl:rounded-lg">
        <AlertDialogHeader className="items-center justify-center py-2">
          <AlertDialogTitle className="text-lg font-normal">
            Discard post?
          </AlertDialogTitle>
          <AlertDialogDescription>
            If you leave, your edits won't be saved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full !flex-col">
          <button
            onClick={discard}
            className="border-t border-t-slate-300 bg-white py-4 text-sm font-bold text-red-500 hover:bg-white"
          >
            Discard
          </button>
          <button
            className="!mx-0 border-t border-t-slate-300 py-4 text-sm font-normal"
            onClick={() => setIsDialogOpened(false)}
          >
            Cancel
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostFormDiscard;
