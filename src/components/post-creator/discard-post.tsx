import { ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
} from "../ui/alert-dialog";

import { Dispatch, SetStateAction, useState } from "react";

const DiscardPost = ({
  setCreatorOpened,
}: {
  setCreatorOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const [discardPostOpened, setDiscardPostOpened] = useState(false);

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
            onClick={() => setCreatorOpened(false)}
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
