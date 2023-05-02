import { PostContext } from "contexts/post-context";
import { useContext, useState } from "react";
import { useToast } from "../../../../hooks/use-toast";
import { api } from "~/utils/api";

const usePostAddComment = () => {
  const { post, refetch } = useContext(PostContext)!;
  const { toast } = useToast();
  const { mutate: comment } = api.comment.commentPostById.useMutation();
  const [commentContent, setCommentContent] = useState("");

  const addComment = () => {
    setCommentContent("");
    comment(
      { id: post.id, content: commentContent },
      {
        onSettled() {
          refetch();
        },
        onError(error) {
          toast({
            title: "Something went wrong while adding the comment.",
            description: error.message,
            duration: 3000,
            variant: "destructive",
          });
        },
      }
    );
  };

  return {
    addComment,
    commentContent,
    setCommentContent,
  };
};

export default usePostAddComment;
