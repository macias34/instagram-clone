import { useSession } from "next-auth/react";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/utils/api";
import { useState } from "react";
import { ListDialogSingleUserProps } from "./list-dialog-single-user";

const useListDialogSingleUser = ({
  user,
  refetch,
}: ListDialogSingleUserProps) => {
  const { data: sessionData } = useSession();
  const { toast } = useToast();

  const { mutate: toggleFollowInDb } =
    api.user.toggleFollowByUserID.useMutation({
      onSettled() {
        refetch();
      },
      onError(error) {
        toast({
          title: "Something went wrong while toggling follow on the user.",
          description: error.message,
          duration: 3000,
          variant: "destructive",
        });
      },
    });

  const [isFollowed, setIsFollowed] = useState(
    user.followers.some((user) => user.followerId === sessionData?.user.id)
  );

  const toggleFollow = () => {
    if (!sessionData) return;
    setIsFollowed((prevState) => !prevState);
    toggleFollowInDb(user.id);
  };

  const isAuthor = sessionData?.user.name === user.username;

  return {
    toggleFollow,
    isFollowed,
    isAuthor,
  };
};

export default useListDialogSingleUser;
