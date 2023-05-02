import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import { api } from "~/utils/api";
import SearchResults from "./search-results/search-results";
import SearchIcon from "./assets/search-icon";

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
        <button className="flex items-center gap-4 rounded-full p-2 text-base hover:bg-slate-50 xl:w-full xl:pl-2">
          <SearchIcon />
          <span className="hidden xl:inline">Search</span>
        </button>
      </DialogTrigger>
      <DialogContent className="flex w-[400px] flex-col max-xl:top-1/2 max-xl:max-w-sm max-xl:-translate-y-1/2 max-xl:rounded-lg xl:min-h-[80%]">
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
        <SearchResults
          users={users}
          isLoading={isLoading}
          searchValue={searchValue}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Search;
