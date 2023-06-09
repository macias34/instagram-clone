import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import Avatar from "~/components/ui/avatar";
import PostMenu from "./post-menu/post-menu";
import { PostContext } from "contexts/post-context";
import usePostHeader from "./use-post-header";

const PostHeader = () => {
  const { post } = useContext(PostContext)!;
  const { isFollowed, toggleFollow, isAuthor } = usePostHeader();

  return (
    <div className="flex items-center justify-between border-b border-b-slate-200 px-3.5 py-3.5 text-sm  font-semibold">
      <div className="flex items-center gap-3">
        <Avatar user={post.author} size={32} />
        <Link href={`/${post.author?.username}`}>
          <span>{post.author?.username}</span>
        </Link>
        {!isAuthor && (
          <>
            {isFollowed ? (
              <span
                onClick={toggleFollow}
                className="cursor-pointer text-slate-800 hover:text-slate-400"
              >
                Following
              </span>
            ) : (
              <span
                onClick={toggleFollow}
                className="cursor-pointer text-blue-600 hover:text-slate-700"
              >
                Follow
              </span>
            )}
          </>
        )}
      </div>

      {isAuthor && <PostMenu />}
    </div>
  );
};

export default PostHeader;
