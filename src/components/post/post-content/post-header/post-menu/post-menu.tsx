import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown";
import PostEditDialog from "./post-edit/post-edit-dialog";
import PostDelete from "./post-delete/post-delete";

const PostMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsThreeDots size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm font-medium outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-700">
          <PostEditDialog />
        </button>

        <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm font-medium outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-700">
          <PostDelete />
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMenu;
