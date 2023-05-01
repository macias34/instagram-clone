import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import Avatar from "~/components/profile/avatar";
import PostMenu from "./post-header/post-menu";
import { PostContext } from "contexts/post-context";
import usePostHeader from "~/hooks/post/use-post-header";

const PostHeader = () => {
  const { data: sessionData } = useSession();
  const { post } = useContext(PostContext)!;
  const { isFollowed, toggleFollow } = usePostHeader();

  return (
    <div className="flex items-center justify-between border-b border-b-slate-200 px-3.5 py-3.5 text-sm  font-semibold">
      <div className="flex items-center gap-3">
        <Avatar user={post.author} size={32} />
        <Link href={`/${post.author?.username}`}>
          <span>{post.author?.username}</span>
        </Link>
        {post.authorId !== sessionData?.user.id && (
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

      {sessionData?.user.id === post.authorId && <PostMenu post={post} />}
    </div>
  );
};

export default PostHeader;
