import { PostContext } from "contexts/post-context";
import ImageSlider from "../image-slider/image-slider";
import PostContent from "./post-content/post-content";
import { useContext } from "react";

const Post = () => {
  const { post } = useContext(PostContext)!;

  return (
    <div className="flex h-full w-full flex-col border border-slate-300 xl:h-auto xl:flex-row">
      <ImageSlider images={post.images} />
      <div className="w-full xl:w-2/3">
        <PostContent />
      </div>
    </div>
  );
};

export default Post;
