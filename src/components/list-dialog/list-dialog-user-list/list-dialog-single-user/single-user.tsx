import Avatar from "~/components/ui/avatar";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { RouterOutputs } from "~/utils/api";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useToast } from "~/hooks/use-toast";

interface ListDialogSingleUserProps {
  user: RouterOutputs["user"]["getUserPublicDataByUsername"]["followers"][0];
  refetch: () => void;
}

const ListDialogSingleUser = ({ user, refetch }: ListDialogSingleUserProps) => {
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

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar user={user} size={44} />
        <Link href={`/${user.username}`} className="text-sm font-medium">
          {user.username}
        </Link>
      </div>
      {sessionData?.user.name === user.username ? (
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

export default ListDialogSingleUser;
