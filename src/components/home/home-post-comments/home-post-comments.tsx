import { PostContext } from "contexts/post-context";
import Link from "next/link";
import { useContext } from "react";

const HomePostComments = () => {
  const { post } = useContext(PostContext)!;

  return (
    <Link className="text-sm text-slate-500" href={`/p/${post.id}`}>
      {post.comments.length > 1 && `View all ${post.comments.length} comments`}
      {post.comments.length === 1 && "View comment"}
      {post.comments.length === 0 && "No comments yet. Start a conversation!"}
    </Link>
  );
};

export default HomePostComments;
