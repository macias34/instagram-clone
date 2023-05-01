import { useState } from "react";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { PostProps } from "../post/post-content";
import PostEditor from "./post-editor";

const PostEditorDialog = ({ post }: { post: PostProps["post"] }) => {
  const [creatorOpened, setCreatorOpened] = useState<boolean>(false);

  return (
    <AlertDialog open={creatorOpened}>
      <AlertDialogTrigger
        className="font-normal"
        onClick={() => setCreatorOpened(true)}
      >
        Edit post
      </AlertDialogTrigger>
      {creatorOpened && (
        <PostEditor post={post} setCreatorOpened={setCreatorOpened} />
      )}
    </AlertDialog>
  );
};

export default PostEditorDialog;
