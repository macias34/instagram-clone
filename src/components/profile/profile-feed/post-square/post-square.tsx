import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { HiSquare2Stack } from "react-icons/hi2";
import { RouterOutputs } from "~/utils/api";

interface PostSquareProps {
  post: RouterOutputs["post"]["getPostsByUsername"][0];
}

const PostSquare: FunctionComponent<PostSquareProps> = ({ post }) => {
  return (
    <div className="group relative aspect-square w-[32.5%] xl:w-[33%]">
      <Link className="h-full w-full" href={`/p/${post.id}`}>
        <Image
          sizes="300"
          fill
          style={{ objectFit: "cover" }}
          alt=""
          src={post.images[0]?.src!}
        />

        {post.images.length > 1 && (
          <div className="absolute right-2 top-2 z-10 text-white">
            <HiSquare2Stack size="25" />
          </div>
        )}

        <div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center gap-4 bg-[rgba(0,0,0,0.3)] text-lg font-bold text-white group-hover:flex xl:gap-7">
          <span className="flex items-center gap-2">
            <AiFillHeart size="25" /> {post.likes.length}
          </span>
          <span className="flex items-center gap-2">
            <FaComment size="20" /> {post.comments.length}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PostSquare;
