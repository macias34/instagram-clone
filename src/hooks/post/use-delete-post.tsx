import { PostContext } from "contexts/post-context";
import { useContext } from "react";
import { api } from "~/utils/api";
import { useToast } from "../use-toast";
import { useRouter } from "next/router";

const useDeletePost = () => {
  const { post } = useContext(PostContext)!;
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
        toast({
          title: "Successfully deleted the post!",
          duration: 3000,
        });
      },
    });
  };

  return {
    deletePost,
  };
};

export default useDeletePost;
