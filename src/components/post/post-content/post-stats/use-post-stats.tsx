import { PostContext } from "contexts/post-context";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useToast } from "../../../../hooks/use-toast";

const usePostStats = () => {
  const { data: sessionData } = useSession();
  const { post, refetch } = useContext(PostContext)!;
  const { toast } = useToast();
  const { mutate: like } = api.like.toggleLikePostById.useMutation();

  const [isLiked, setIsLiked] = useState(
    post.likes.some((like) => like.userId === sessionData?.user.id)
  );

  const toggleLike = () => {
    if (isLiked) setIsLiked(false);
    else setIsLiked(true);

    like(post.id, {
      onSettled() {
        refetch();
      },

      onError(error) {
        toast({
          title: "Something went wrong while toggling like on the post.",
          description: error.message,
          duration: 3000,
          variant: "destructive",
        });
      },
    });
  };

  const setLikeStateForSession = () => {
    setIsLiked(post.likes.some((like) => like.userId === sessionData?.user.id));
  };

  useEffect(() => {
    setLikeStateForSession();
  }, [post]);

  return {
    toggleLike,
    isLiked,
  };
};

export default usePostStats;
