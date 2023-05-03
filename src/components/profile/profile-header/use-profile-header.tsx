import { useSession } from "next-auth/react";
import { useToast } from "~/hooks/use-toast";
import { RouterOutputs, api } from "~/utils/api";
import { useState, useEffect } from "react";
import { ListUser } from "~/components/list-dialog/list-dialog";
import { ProfileHeaderProps } from "./profile-header";

const useProfileHeader = ({ userData, refetch }: ProfileHeaderProps) => {
  const { data: sessionData } = useSession();
  const { toast } = useToast();
  const { mutate: toggleFollowInDb } =
    api.user.toggleFollowByUserID.useMutation({
      onSettled() {
        refetch();
      },
    });

  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [dialogMode, setDialogMode] = useState<"followers" | "followings">(
    "followers"
  );
  const [isFollowed, setIsFollowed] = useState(
    userData.followers.some((follower) => follower.id === sessionData?.user.id)
  );

  const [userList, setUserList] = useState<ListUser[]>([]);

  const isAuthor = sessionData?.user.name === userData.username;

  const toggleFollow = () => {
    if (!sessionData) return;

    setIsFollowed((prevState) => !prevState);
    toggleFollowInDb(userData.id, {
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

  const showDialog = (mode: typeof dialogMode) => {
    if (mode === "followers") {
      setDialogMode("followers");
      setUserList(userData.followers);
    } else if (mode === "followings") {
      setDialogMode("followings");
      setUserList(userData.followings);
    }

    setIsDialogOpened(true);
  };

  useEffect(() => {
    setIsFollowed(
      userData.followers.some(
        (follower) => follower.id === sessionData?.user.id
      )
    );
  }, [userData.name]);

  return {
    showDialog,
    isDialogOpened,
    setIsDialogOpened,
    dialogMode,
    userList,
    isAuthor,
    toggleFollow,
    isFollowed,
  };
};

export default useProfileHeader;
