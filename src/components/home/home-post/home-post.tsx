import { RouterOutputs } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import PostStats from "../../post/post-content/post-stats/post-stats";
import { PostContext } from "contexts/post-context";
import HomePostHeader from "./home-post-header/home-post-header";
import HomePostComments from "./home-post-comments/home-post-comments";
import ImageSlider from "~/components/image-slider/image-slider";
dayjs.extend(relativeTime);

interface HomePostProps {
  post: RouterOutputs["home"]["getBatchPosts"]["posts"][0];
  refetch: () => void;
}

const HomePost = ({ post, refetch }: HomePostProps) => {
  return (
    <PostContext.Provider value={{ post, refetch }}>
      <div className="w-[90vw] xl:w-[34rem]">
        <HomePostHeader />
        <div>
          <ImageSlider images={post.images} />
        </div>
        <div className="py-3.5">
          <PostStats />
        </div>
        <HomePostComments />
      </div>
    </PostContext.Provider>
  );
};

export default HomePost;
