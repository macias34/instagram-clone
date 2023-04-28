import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { RxCross1 } from "react-icons/rx";
import { FC } from "react";
import { RouterOutputs } from "~/utils/api";
import UserList from "./user-list";
import { createMachine } from "xstate";

export type ListUser =
  RouterOutputs["user"]["getUserPublicDataByUsername"]["followers"][0];

interface ListDialogProps {
  followers?: ListUser[];
  followings?: ListUser[];
  likers?: ListUser[];
  isDialogOpened: boolean;
  setIsDialogOpened: Dispatch<SetStateAction<boolean>>;
  mode: "followers" | "followings" | "likers";
  refetch: () => void;
}

const ListDialog: FC<ListDialogProps> = ({
  likers,
  followers,
  followings,
  isDialogOpened,
  setIsDialogOpened,
  mode,
  refetch,
}) => {
  useEffect(() => {
    return () => {
      if (isDialogOpened) setIsDialogOpened(false);
    };
  }, [isDialogOpened]);

  return (
    <AlertDialog open={isDialogOpened}>
      <AlertDialogContent className="max-w-sm gap-5 px-0 py-0 max-xl:max-w-sm max-xl:-translate-y-1/2 max-xl:rounded-lg">
        <div className="relative flex w-full  items-center justify-center border-b border-b-gray-300 py-3">
          <span className="font-semibold capitalize">{mode}</span>
          <span
            onClick={() => setIsDialogOpened(false)}
            className="absolute right-0 !my-0 mr-3 cursor-pointer !space-y-0"
          >
            <RxCross1 size={20} />
          </span>
        </div>

        <div className="flex h-[350px] w-full flex-col gap-5 overflow-x-auto px-5">
          {mode === "followers" && followers && (
            <UserList
              users={followers}
              refetch={refetch}
              emptyStateMessage="This user isn't followed by anyone."
            />
          )}

          {mode === "followings" && followings && (
            <UserList
              users={followings}
              refetch={refetch}
              emptyStateMessage="This user isn't following anyone."
            />
          )}

          {mode === "likers" && likers && (
            <UserList
              users={likers}
              refetch={refetch}
              emptyStateMessage="This post has no likes."
            />
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ListDialog;
