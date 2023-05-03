import dayjs from "dayjs";
import { Session } from "next-auth";
import Avatar from "~/components/ui/avatar";
import { RouterOutputs, api } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";
import { PostContext } from "contexts/post-context";
import { useContext } from "react";
import usePostComment from "./use-post-comment";

dayjs.extend(relativeTime);

interface PostCommentProps {
  sessionData: Session | null;
  comment: RouterOutputs["post"]["getPostById"]["comments"][0];
}

const PostComment = ({ comment, sessionData }: PostCommentProps) => {
  const { post } = useContext(PostContext)!;
  const { deleteComment } = usePostComment();

  return (
    <div key={comment.id} className="flex w-[95%] gap-3">
      <Avatar user={comment} size={32} />
      <div className="flex flex-col gap-1">
        <span className="break-all">
          <span className="mr-1.5 w-fit font-medium">
            {comment.commentAuthor?.username}
          </span>
          <span>{comment.content}</span>
        </span>

        <div className="flex gap-3 text-xs font-semibold">
          <span className="text-slate-500">
            {dayjs(comment.createdAt).fromNow()}
          </span>

          {sessionData?.user.id === comment.userId &&
            !(comment.id === post.id) && (
              <button
                onClick={() => deleteComment(comment.id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
