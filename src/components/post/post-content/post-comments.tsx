import Avatar from "~/components/profile/avatar";
import { PostProps } from "../post-content";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

dayjs.extend(relativeTime);

const PostComments = ({ post, refetch }: PostProps) => {
  const { data: sessionData } = useSession();
  const { mutate: deleteCommentFromDb } =
    api.comment.deleteCommentById.useMutation();

  const deleteComment = (commentId: string) => {
    deleteCommentFromDb(commentId, {
      onSettled() {
        refetch();
      },
    });
  };

  return (
    <div className="scrollbar-hide relative flex h-[63%] w-full flex-col gap-5 overflow-x-auto border-b border-b-slate-200 px-3.5 py-3.5 text-sm">
      {post.comments.length > 0 ? (
        <>
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex w-[95%] gap-3">
              <Avatar user={post.author} size={32} />
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

                  {sessionData?.user.id === comment.userId && (
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