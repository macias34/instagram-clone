import Avatar from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { RouterOutputs, api } from "~/utils/api";
import ListDialog from "../../list-dialog/list-dialog";
import useProfileHeader from "./use-profile-header";
import ProfileHeaderStats from "./profile-header-stats/profile-header-stats";

export interface ProfileHeaderProps {
  userData: RouterOutputs["user"]["getUserPublicDataByUsername"];
  refetch: () => void;
}

const ProfileHeader = ({ userData, refetch }: ProfileHeaderProps) => {
  const {
    showDialog,
    isAuthor,
    toggleFollow,
    isDialogOpened,
    setIsDialogOpened,
    dialogMode,
    userList,
    isFollowed,
  } = useProfileHeader({ userData, refetch });

  return (
    <>
      <ListDialog
        refetch={refetch}
        dialogLabel={dialogMode}
        isDialogOpened={isDialogOpened}
        setIsDialogOpened={setIsDialogOpened}
        userList={userList}
      />
      <div className="flex flex-col items-center gap-5 px-5 xl:flex-row xl:items-start xl:gap-24 xl:pl-20 xl:pr-52">
        <Avatar user={userData} size={150} />
        <div className="flex grow flex-col gap-5">
          <div className="flex items-center gap-10">
            <span className="text-lg font-normal">{userData.username}</span>
            <div className="flex gap-2">
              {!isAuthor && (
                <Button
                  onClick={toggleFollow}
                  variant={`${isFollowed ? "instagram" : "accent"}`}
                  size="instagram"
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
          </div>

          <ProfileHeaderStats userData={userData} showDialog={showDialog} />

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
