import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import useDeletePost from "~/hooks/post/use-delete-post";

const DeletePostDialog = () => {
  const { deletePost } = useDeletePost();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-red-500 hover:text-red-600">
        Delete post
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm p-0 pt-7">
        <AlertDialogHeader className="items-center justify-center py-2">
          <AlertDialogTitle className="text-lg font-normal">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this post from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full !flex-col">
          <AlertDialogAction
            onClick={deletePost}
            className="border-t border-t-slate-300 bg-white py-4 text-sm font-bold text-red-500 hover:bg-white"
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel className="!mx-0 border-t border-t-slate-300 py-4 text-sm font-normal">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostDialog;
