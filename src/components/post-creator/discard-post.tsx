import { ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { ImageData } from "./creator";
import { Dispatch, SetStateAction, useState } from "react";

const DiscardPost = ({
  setCreatorOpened,
  images,
}: {
  setCreatorOpened: Dispatch<SetStateAction<boolean>>;
  images: ImageData[];
}) => {
  const [discardPostOpened, setDiscardPostOpened] = useState(false);

  const onDiscard = () => {
    if (images && images.length > 0) {
      images.map((image) => URL.revokeObjectURL(image.src));
    }
    setCreatorOpened(false);
  };

  return (
    <AlertDialog open={discardPostOpened}>
      <AlertDialogTrigger onClick={() => setDiscardPostOpened(true)}>
        <div title="Discard post" className="cursor-pointer">
          <ArrowLeft />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm p-0 pt-7">
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
            onClick={onDiscard}
            className="border-t border-t-slate-300 bg-white py-4 text-sm font-bold text-red-500 hover:bg-white"
          >
            Discard
          </button>
          <button
            className="!mx-0 border-t border-t-slate-300 py-4 text-sm font-normal"
            onClick={() => setDiscardPostOpened(false)}
          >
            Cancel
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DiscardPost;
