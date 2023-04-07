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

import { Dispatch, SetStateAction } from "react";

const DiscardPost = ({
  setCreatorOpened,
}: {
  setCreatorOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div title="Discard post" className="cursor-pointer">
          <ArrowLeft />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard post?</AlertDialogTitle>
          <AlertDialogDescription>
            If you leave, your edits won't be saved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => setCreatorOpened(false)}
            className="bg-red-500 hover:bg-red-600"
          >
            Discard
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DiscardPost;
