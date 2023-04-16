import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import { api } from "~/utils/api";
import Avatar from "../profile/avatar";
import Link from "next/link";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: users, isLoading } = api.home.searchForUsers.useQuery(
    searchValue,
    {
      enabled: searchValue.trim().length > 0,
    }
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-4 rounded-full py-2 pl-2 pr-28 text-base hover:bg-slate-50">
          <svg
            aria-label="Search"
            color="rgb(0, 0, 0)"
            fill="rgb(0, 0, 0)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="16.511"
              x2="22"
              y1="16.511"
              y2="22"
            ></line>
          </svg>
          Search
        </button>
      </DialogTrigger>
      <DialogContent className="flex min-h-[80%] w-[400px] flex-col">
        <DialogHeader>
          <DialogTitle className="mb-3 text-2xl">Search for a user</DialogTitle>
        </DialogHeader>
        <DebounceInput
          className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
          minLength={2}
          placeholder="Search"
          debounceTimeout={300}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <div className="scrollbar-hide mt-5 flex h-96 flex-col gap-3 overflow-x-auto">
          {users && users.length > 0 && (
            <>
              {users.map((user) => (
                <Link
                  href={`/${user.username}`}
                  className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50"
                  key={Math.random()}
                >
                  <Avatar user={user} size={44} />
                  <span className="text-sm font-semibold">{user.username}</span>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
