import { FunctionComponent, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown";
import { PostProps } from "../../post-content";
import DeletePost from "./delete-post";

interface PostMenuProps {
  post: PostProps["post"];
}

const PostMenu: FunctionComponent<PostMenuProps> = ({ post }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsThreeDots size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="font-normal">Edit</DropdownMenuItem>
        <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm font-medium outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-700">
          <DeletePost post={post} />
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMenu;
