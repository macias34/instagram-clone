import { FunctionComponent, useContext } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown";
import DeletePostDialog from "./delete-post-dialog";
import PostEditorDialog from "../../../post-editor/post-editor-dialog";
import { PostContext } from "contexts/post-context";

const PostMenu = () => {
  const { post } = useContext(PostContext)!;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsThreeDots size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm font-medium outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-700">
          <PostEditorDialog />
        </button>

        <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm font-medium outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-700">
          <DeletePostDialog />
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMenu;
