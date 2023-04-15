import { RouterOutputs } from "~/utils/api";
import ImageSlider from "../post/image-slider";
import PostHeader from "../post/post-content/post-header";

const Post = ({
  post,
}: {
  post: RouterOutputs["home"]["getBatchPosts"]["posts"][0];
}) => {
  return (
    <div className="w-[550px]">
      <ImageSlider images={post.images} />
    </div>
  );
};

export default Post;
