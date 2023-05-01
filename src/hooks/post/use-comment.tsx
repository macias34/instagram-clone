import { api } from "~/utils/api";
import { useToast } from "../use-toast";
import { PostContext } from "contexts/post-context";
import { useContext } from "react";

const useComment = () => {
  const { toast } = useToast();
  const { mutate: deleteCommentFromDb } =
    api.comment.deleteCommentById.useMutation();
  const { refetch } = useContext(PostContext)!;

  const deleteComment = (commentId: string) => {
    deleteCommentFromDb(commentId, {
      onSettled() {
        refetch();
      },
      onError(error) {
        toast({
          title: "Something went wrong while deleting the comment.",
          description: error.message,
          duration: 3000,
          variant: "destructive",
        });
      },
    });
  };

  return {
    deleteComment,
  };
};

export default useComment;
