import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Avatar from "~/components/profile/avatar";
import { api } from "~/utils/api";
import { PostProps } from "../post-content";
import DeletePost from "./post-header/delete-post-dialog";
import { BsThreeDots } from "react-icons/bs";
import PostMenu from "./post-header/post-menu";

const PostHeader = ({ post }: PostProps) => {
  const { data: sessionData } = useSession();

  const [isFollowed, setIsFollowed] = useState(
    post?.author?.followers.some(
      (follower) => follower.followerId === sessionData?.user.id
    )
  );

  const { mutate: toggleFollowInDb } =
    api.user.toggleFollowByUserID.useMutation();

  const toggleFollow = () => {
    if (!sessionData) return;

    setIsFollowed((prevState) => !prevState);
    toggleFollowInDb(post.authorId);
  };

  useEffect(() => {
    setIsFollowed(
      post?.author?.followers.some(
        (follower) => follower.followerId === sessionData?.user.id
      )
    );
  }, [sessionData]);

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
