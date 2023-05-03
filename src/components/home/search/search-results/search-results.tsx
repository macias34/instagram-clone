import { RouterOutputs } from "~/utils/api";
import { FC } from "react";
import Link from "next/link";
import Avatar from "~/components/ui/avatar";
import LoadingSpinner from "~/components/ui/loading-spinner";
import { DialogClose } from "@radix-ui/react-dialog";

interface SearchResultsProps {
  users: RouterOutputs["home"]["searchForUsers"] | undefined;
  searchValue: string;
  isLoading: boolean;
}

const SearchResults: FC<SearchResultsProps> = ({
  users,
  searchValue,
  isLoading,
}) => {
  return (
    <div className="scrollbar-hide mt-5 flex h-96 flex-col gap-3 overflow-x-auto">
      {isLoading && searchValue.trim().length > 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 text-3xl">
          <LoadingSpinner />
        </div>
      )}

      <>
        {users && users.length > 0 && (
          <>
            {users.map((user) => (
              <Link href={`/${user.username}`} className="" key={user.id}>
                <DialogClose className="flex h-full w-full items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50">
                  <Avatar user={user} size={44} />
                  <span className="text-sm font-semibold">{user.username}</span>
                </DialogClose>
              </Link>
            ))}
          </>
        )}

        {searchValue.trim().length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-5 text-3xl">
            ⌨️
            <span className="text-2xl">Start typing to get results</span>
          </div>
        )}

        {users && users.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-5 text-3xl">
            😭
            <span className="text-2xl">No users found</span>
          </div>
        )}
      </>
    </div>
  );
};

export default SearchResults;
