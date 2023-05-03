import PostHeader from "./post-header/post-header";
import PostStats from "./post-stats/post-stats";
import PostComments from "./post-comments/post-comments";
import PostAddComment from "./post-add-comment/post-add-comment";

const PostContent = () => {
  return (
    <div className="flex h-full grow flex-col border-l">
      <PostHeader />
      <PostComments />
      <div className="p-3.5">
        <PostStats />
      </div>
      <PostAddComment />
    </div>
  );
};

export default PostContent;
