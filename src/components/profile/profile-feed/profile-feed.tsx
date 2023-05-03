import Image from "next/image";
import Link from "next/link";
import { RouterOutputs, api } from "~/utils/api";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { HiSquare2Stack } from "react-icons/hi2";
import { BsCameraFill } from "react-icons/bs";
import PostSquare from "./post-square/post-square";

const ProfileFeed = ({
  posts,
}: {
  posts: RouterOutputs["post"]["getPostsByUsername"];
}) => {
  return (
    <div className="flex h-full grow items-center">
      <div className="flex h-full grow flex-wrap justify-between gap-1">
        {posts.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <BsCameraFill size="30" />
            <span className="text-2xl font-semibold">No posts yet</span>
          </div>
        )}

        {posts.map((post) => (
          <PostSquare key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfileFeed;
