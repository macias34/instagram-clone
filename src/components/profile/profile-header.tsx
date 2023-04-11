import Avatar from "~/components/profile/avatar";
import { Button } from "~/components/ui/button";
import { RouterOutputs, api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ListDialog from "./list-dialog";

const ProfileHeader = ({
  userData,
  refetch,
}: {
  userData: RouterOutputs["user"]["getUserPublicDataByUsername"];
  refetch: () => void;
}) => {
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
  console.log(isFollowed);

  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [dialogMode, setDialogMode] = useState<"followers" | "followings">(
    "followers"
  );

  const toggleFollow = () => {
    if (!sessionData) return;

    setIsFollowed((prevState) => !prevState);
    toggleFollowInDb(userData.id);
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
    return () => {
      setIsFollowed(
        userData.followers.some(
          (follower) => follower.id === sessionData?.user.id
        )
      );
      if (isDialogOpened) setIsDialogOpened(false);
    };
  }, [userData.name, isDialogOpened]);

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
      <div className="flex gap-24 pl-20 pr-52">
        <Avatar user={userData} size={150} />
        <div className="flex grow flex-col gap-5">
          <div className="flex items-center gap-10">
            <span className="text-lg font-normal">{userData.username}</span>
            <div className="flex gap-2">
              {sessionData?.user.name === userData.username ? (
                <Button variant="instagram" size="instagram">
                  Edit profile
                </Button>
              ) : (
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
              posts
            </span>
            <span
              onClick={() => showDialog("followers")}
              className="cursor-pointer text-base"
            >
              <span className="font-semibold">{userData.followers.length}</span>{" "}
              followers
            </span>
            <span
              onClick={() => showDialog("followings")}
              className="cursor-pointer text-base"
            >
              <span className="font-semibold">
                {userData.followings.length}
              </span>{" "}
              followings
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
