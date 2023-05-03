import Avatar from "~/components/ui/avatar";
import { RouterOutputs } from "~/utils/api";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import useListDialogSingleUser from "./use-list-dialog-single-user";
import { useContext } from "react";
import { ListDialogContext } from "contexts/list-dialog-context";

export interface ListDialogSingleUserProps {
  user: RouterOutputs["user"]["getUserPublicDataByUsername"]["followers"][0];
  refetch: () => void;
}

const ListDialogSingleUser = ({ user, refetch }: ListDialogSingleUserProps) => {
  const { isAuthor, isFollowed, toggleFollow } = useListDialogSingleUser({
    user,
    refetch,
  });

  const { setIsDialogOpened } = useContext(ListDialogContext)!;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar user={user} size={44} />
        <Link
          href={`/${user.username}`}
          onClick={() => setIsDialogOpened(false)}
          className="text-sm font-medium"
        >
          {user.username}
        </Link>
      </div>
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
  );
};

export default ListDialogSingleUser;
