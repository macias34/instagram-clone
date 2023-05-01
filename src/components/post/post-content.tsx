import AddComment from "./post-content/add-comment";
import PostHeader from "./post-content/post-header";
import PostStats from "./post-content/post-stats";
import PostComments from "./post-content/post-comments";
const PostContent = () => {
  return (
    <div className="flex h-full grow flex-col">
      <PostHeader />
      <PostComments />
      <div className="p-3.5">
        <PostStats />
      </div>
      <AddComment />
    </div>
  );
};

export default PostContent;
