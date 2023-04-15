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
import { api } from "~/utils/api";
import { PostProps } from "../../post-content";
import { useToast } from "~/hooks/use-toast";
import { useRouter } from "next/router";

const DeletePost = ({ post }: Omit<PostProps, "refetch">) => {
  const { mutate: deletePostInDb } = api.post.deletePostById.useMutation();
  const { toast } = useToast();
  const router = useRouter();

  const deletePost = () => {
    deletePostInDb(post.id, {
      onError(error) {
        toast({
          title: "Error while trying to delete the post.",
          description: error.message,
          variant: "destructive",
          duration: 3000,
        });
      },
      onSuccess() {
        router.push(`/${post.author.username}`);
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="text-red-500">Delete post</button>
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

export default DeletePost;
