import { useState } from "react";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import PostEditor from "./post-editor";

const PostEditorDialog = () => {
  const [creatorOpened, setCreatorOpened] = useState<boolean>(false);

  return (
    <AlertDialog open={creatorOpened}>
      <AlertDialogTrigger
        className="font-normal"
        onClick={() => setCreatorOpened(true)}
      >
        Edit post
      </AlertDialogTrigger>
      {creatorOpened && <PostEditor setCreatorOpened={setCreatorOpened} />}
    </AlertDialog>
  );
};

export default PostEditorDialog;
