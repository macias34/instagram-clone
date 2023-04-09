import { BiAddToQueue } from "react-icons/bi";
import { useState, Dispatch, SetStateAction } from "react";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";

import Creator from "./creator";

const PostCreatorDialog = () => {
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
