import { useSession } from "next-auth/react";
import { PostContext } from "contexts/post-context";
import { useContext } from "react";
import PostComment from "./post-comment/post-comment";

const PostComments = () => {
  const { post } = useContext(PostContext)!;
  const { data: sessionData } = useSession();

  return (
    <div className="scrollbar-hide relative flex h-44 w-full flex-col gap-5 overflow-x-auto border-b border-b-slate-200 px-3.5 py-3.5 text-sm xl:h-96">
      {post.comments.length > 0 ? (
        <>
          {post.comments.map((comment) => (
            <PostComment
              key={comment.id}
              comment={comment}
              sessionData={sessionData}
            />
          ))}
        </>
      ) : (
        <span className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
          No comments yet.
        </span>
      )}
    </div>
  );
};

export default PostComments;
