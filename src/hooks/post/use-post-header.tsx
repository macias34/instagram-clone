import { PostContext } from "contexts/post-context";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { toast, useToast } from "../use-toast";

const usePostHeader = () => {
  const { post } = useContext(PostContext)!;
  const { data: sessionData } = useSession();
  const { toast } = useToast();

  const [isFollowed, setIsFollowed] = useState(
    post?.author?.followers.some(
      (follower) => follower.followerId === sessionData?.user.id
    )
  );
  const { mutate: toggleFollowInDb } =
    api.user.toggleFollowByUserID.useMutation();

  const toggleFollow = () => {
    if (!sessionData) return;

    setIsFollowed((prevState) => !prevState);
    toggleFollowInDb(post.authorId, {
      onError(error) {
        toast({
          title: "Something went wrong while toggling follow on the user.",
          description: error.message,
          duration: 3000,
          variant: "destructive",
        });
      },
    });
  };

  const setFollowStateForSession = () => {
    setIsFollowed(
      post?.author?.followers.some(
        (follower) => follower.followerId === sessionData?.user.id
      )
    );
  };

  useEffect(() => {
    setFollowStateForSession();
  }, [sessionData]);

  return {
    isFollowed,
    toggleFollow,
  };
};

export default usePostHeader;
