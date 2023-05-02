import { useContext } from "react";
import { PostContext } from "contexts/post-context";
import PostForm from "~/components/post-form/post-form";
import { AlertDialog, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import usePostEdit from "./use-post-edit";

export interface ImageData {
  name: string;
  file?: File;
  src: string;
}

const PostEdit = () => {
  const { post: fetchedPost } = useContext(PostContext)!;
  const { editPost, isDialogOpened, setIsDialogOpened } =
    usePostEdit(fetchedPost);

  return (
    <AlertDialog open={isDialogOpened}>
      <AlertDialogTrigger
        className="font-normal"
        onClick={() => setIsDialogOpened(true)}
      >
        Edit post
      </AlertDialogTrigger>
      {isDialogOpened && (
        <PostForm
          post={fetchedPost}
          onSubmit={editPost}
          setDialogOpened={setIsDialogOpened}
        />
      )}
    </AlertDialog>
  );
};

export default PostEdit;
