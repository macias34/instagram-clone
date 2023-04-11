import Image from "next/image";
import Link from "next/link";
import { RouterOutputs, api } from "~/utils/api";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { HiSquare2Stack } from "react-icons/hi2";
import { BsCameraFill } from "react-icons/bs";

const ProfileFeed = ({
  posts,
}: {
  posts: RouterOutputs["post"]["getPostsByUsername"];
}) => {
  return (
    <div className="flex h-full grow items-center">
      <div className="flex h-full grow flex-wrap gap-1">
        {posts.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <BsCameraFill size="30" />
            <span className="text-2xl font-semibold">No posts yet</span>
          </div>
        )}

        {posts.map((post) => (
          <div key={post.id} className="group relative aspect-square w-[33%]">
            <Link className="h-full w-full" href={`/p/${post.id}`}>
              <Image
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

              <div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center gap-7 bg-[rgba(0,0,0,0.3)] text-lg font-bold text-white group-hover:flex">
                <span className="flex items-center gap-2">
                  <AiFillHeart size="25" /> {post.likes.length}
                </span>
                <span className="flex items-center gap-2">
                  <FaComment size="20" /> {post.comments.length}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileFeed;
