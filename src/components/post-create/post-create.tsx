import PostForm from "../post-form/post-form";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import PostCreateIcon from "./assets/post-create-icon";
import usePostCreate from "./use-post-create";

const PostCreate = () => {
  const { isDialogOpened, setIsDialogOpened, createPost } = usePostCreate();

  return (
    <AlertDialog open={isDialogOpened}>
      <AlertDialogTrigger onClick={() => setIsDialogOpened(true)} asChild>
        <button
          title="Open post creation"
          className="flex items-center gap-4 rounded-full p-2 text-base hover:bg-slate-50 xl:w-full xl:pl-2"
        >
          <PostCreateIcon />
          <span className="hidden xl:inline">Create</span>
        </button>
      </AlertDialogTrigger>
      {isDialogOpened && (
        <PostForm
          dialogLabel="Create post"
          onSubmit={createPost}
          setDialogOpened={setIsDialogOpened}
        />
      )}
    </AlertDialog>
  );
};

export default PostCreate;
