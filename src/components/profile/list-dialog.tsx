import Avatar from "~/components/profile/avatar";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { RxCross1 } from "react-icons/rx";
import { FC } from "react";
import { RouterOutputs } from "~/utils/api";
import { Button } from "../ui/button";
import Link from "next/link";
import { UseMutateFunction } from "@tanstack/react-query";

interface ListDialogProps {
  followers: RouterOutputs["user"]["getUserPublicDataByUsername"]["followers"];
  followings: RouterOutputs["user"]["getUserPublicDataByUsername"]["followings"];
  isDialogOpened: boolean;
  setIsDialogOpened: Dispatch<SetStateAction<boolean>>;
  mode: "followers" | "followings";
  refetch: () => void;
}

const SingleFollower = ({
  follower,
  refetch,
}: {
  follower: ListDialogProps["followers"][0];
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
    follower.followers.some(
      (follower) => follower.followerId === sessionData?.user.id
    )
  );

  const toggleFollow = () => {
    if (!sessionData) return;
    setIsFollowed((prevState) => !prevState);
    toggleFollowInDb(follower.id);
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar user={follower} size={44} />
        <Link href={`/${follower.username}`} className="text-sm font-medium">
          {follower.username}
        </Link>
      </div>
      {sessionData?.user.name === follower.username ? (
        ""
      ) : (
        <>
          <Button
            onClick={toggleFollow}
            variant={`${isFollowed ? "instagram" : "accent"}`}
            size="instagram"
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </>
      )}
    </div>
  );
};

const ListDialog: FC<ListDialogProps> = ({
  followers,
  followings,
  isDialogOpened,
  setIsDialogOpened,
  mode,
  refetch,
}) => {
  return (
    <AlertDialog open={isDialogOpened}>
      <AlertDialogContent className="relative max-w-sm gap-5 px-0 py-0">
        <div className="flex w-full items-center justify-center border-b border-b-gray-300 py-3">
          <span className="font-semibold capitalize">{mode}</span>
          <span
            onClick={() => setIsDialogOpened(false)}
            className="absolute right-0 !my-0 mr-3 cursor-pointer !space-y-0"
          >
            <RxCross1 size={20} />
          </span>
        </div>

        <div className="flex h-[350px] w-full flex-col gap-5 overflow-x-auto px-5">
          {mode === "followers" && (
            <>
              {followers.length > 0 ? (
                followers.map((follower) => (
                  <SingleFollower
                    refetch={refetch}
                    key={follower.id}
                    follower={follower}
                  />
                ))
              ) : (
                <div className="absolute right-1/2 top-1/2 flex w-full -translate-y-1/2 translate-x-1/2 flex-col items-center justify-center gap-3">
                  <span className="text-[2rem]">😭</span>
                  <span className="text-xl">
                    This user isn't followed by anyone.
                  </span>
                </div>
              )}
            </>
          )}

          {mode === "followings" && (
            <>
              {followings.length > 0 ? (
                followings.map((following) => (
                  <SingleFollower
                    refetch={refetch}
                    key={following.id}
                    follower={following}
                  />
                ))
              ) : (
                <div className="absolute right-1/2 top-1/2 flex w-full -translate-y-1/2 translate-x-1/2 flex-col items-center justify-center gap-3">
                  <span className="text-[2rem]">🤔</span>
                  <span className="text-xl">
                    This user doesn't follow anyone.
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ListDialog;
