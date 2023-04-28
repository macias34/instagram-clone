import Avatar from "~/components/profile/avatar";
import { Button } from "~/components/ui/button";
import { RouterOutputs, api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ListDialog from "./list-dialog";
import { useToast } from "~/hooks/use-toast";

interface ProfileHeader {
  userData: RouterOutputs["user"]["getUserPublicDataByUsername"];
  refetch: () => void;
}

const ProfileHeader = ({ userData, refetch }: ProfileHeader) => {
  const { toast } = useToast();
  const { data: sessionData } = useSession();
  const { mutate: toggleFollowInDb } =
    api.user.toggleFollowByUserID.useMutation({
      onSettled() {
        refetch();
      },
    });
  const [isFollowed, setIsFollowed] = useState(
    userData.followers.some((follower) => follower.id === sessionData?.user.id)
  );

  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [dialogMode, setDialogMode] = useState<"followers" | "followings">(
    "followers"
  );

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
    } else if (mode === "followings") {
      setDialogMode("followings");
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

  return (
    <>
      <ListDialog
        refetch={refetch}
        mode={dialogMode}
        isDialogOpened={isDialogOpened}
        setIsDialogOpened={setIsDialogOpened}
        followers={userData.followers}
        followings={userData.followings}
      />
      <div className="flex flex-col items-center gap-5 px-5 xl:flex-row xl:items-start xl:gap-24 xl:pl-20 xl:pr-52">
        <Avatar user={userData} size={150} />
        <div className="flex grow flex-col gap-5">
          <div className="flex items-center gap-10">
            <span className="text-lg font-normal">{userData.username}</span>
            <div className="flex gap-2">
              {sessionData?.user.name !== userData.username && (
                <>
                  <Button
                    onClick={toggleFollow}
                    variant={`${isFollowed ? "instagram" : "accent"}`}
                    size="instagram"
                  >
                    {isFollowed ? "Unfollow" : "Follow"}
                  </Button>
                  <Button variant="instagram" size="instagram">
                    Message
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-10">
            <span className="text-base">
              <span className="font-semibold">{userData.posts.length}</span>{" "}
              {userData.posts.length !== 1 ? "posts" : "post"}
            </span>
            <span
              onClick={() => showDialog("followers")}
              className="cursor-pointer text-base"
            >
              <span className="font-semibold">{userData.followers.length}</span>{" "}
              {userData.followers.length !== 1 ? "followers" : "follower"}
            </span>
            <span
              onClick={() => showDialog("followings")}
              className="cursor-pointer text-base"
            >
              <span className="font-semibold">
                {userData.followings.length}
              </span>{" "}
              {userData.followers.length !== 1 ? "followings" : "following"}
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <span className="font-semibold">{userData.name}</span>
            {userData.bio && <span>{userData.bio}</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
