import { RouterOutputs } from "~/utils/api";
import AddComment from "./post-content/add-comment";
import PostHeader from "./post-content/post-header";
import PostStats from "./post-content/post-stats";
import PostComments from "./post-content/post-comments";

export interface PostProps {
  post: RouterOutputs["post"]["getPostById"];
  refetch: () => void;
}

const PostContent = ({ post, refetch }: PostProps) => {
  return (
    <div className="flex h-full flex-col">
      <PostHeader post={post} refetch={refetch} />
      <PostComments post={post} refetch={refetch} />
      <PostStats post={post} refetch={refetch} />
      <AddComment post={post} refetch={refetch} />
    </div>
  );
};

export default PostContent;
