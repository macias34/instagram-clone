import { RouterOutputs } from "~/utils/api";
import SingleUser from "./list-dialog/single-user/single-user";

interface UserList {
  users: RouterOutputs["user"]["getUserPublicDataByUsername"]["followers"];
  emptyStateMessage: string;
  refetch: () => void;
}

const UserList = ({ users, emptyStateMessage, refetch }: UserList) => {
  return (
    <div className="flex h-[350px] w-full flex-col gap-5 overflow-x-auto">
      {users && users.length > 0 ? (
        users.map((user) => (
          <SingleUser refetch={refetch} key={user.id} user={user} />
        ))
      ) : (
        <div className="absolute right-1/2 top-1/2 flex w-full -translate-y-1/2 translate-x-1/2 flex-col items-center justify-center gap-3">
          <span className="text-[2rem]">😭</span>
          <span className="text-xl">{emptyStateMessage}</span>
        </div>
      )}
    </div>
  );
};

export default UserList;
