import { RouterOutputs } from "~/utils/api";
import ImageSlider from "../post/image-slider";
import Avatar from "../profile/avatar";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const Post = ({
  post,
}: {
  post: RouterOutputs["home"]["getBatchPosts"]["posts"][0];
}) => {
  return (
    <div className="w-[550px] border border-slate-600">
      <div className="flex items-center  gap-3 p-3.5 text-sm">
        <Avatar user={post.author} size={35} />
        <span className="font-semibold">{post.author.username}</span>
        <span className="text-slate-500">
          {dayjs(post.createdAt).fromNow()}
        </span>
      </div>
      <ImageSlider images={post.images} />
    </div>
  );
};

export default Post;
