import { RouterOutputs } from "~/utils/api";
import ImageSlider from "../post/image-slider";
import Avatar from "../profile/avatar";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import PostStats from "../post/post-content/post-stats";
import PostComments from "../post/post-content/post-comments";
import Link from "next/link";

dayjs.extend(relativeTime);

interface Post {
  post: RouterOutputs["home"]["getBatchPosts"]["posts"][0];
  refetch: () => void;
}

const Post = ({ post, refetch }: Post) => {
  return (
    <div className="w-[34rem]">
      <div className="flex items-center gap-3 px-2 pb-3  text-sm">
        <Link href={`/${post.author.username}`}>
          <Avatar user={post.author} size={35} />
        </Link>
        <Link href={`/${post.author.username}`}>
          <span className="font-semibold">{post.author.username}</span>
        </Link>

        <Link href={`/p/${post.id}`}>
          <span className="text-slate-500">
            {dayjs(post.createdAt).fromNow()}
          </span>
        </Link>
      </div>
      <ImageSlider images={post.images} />
      <div className="py-3.5">
        <PostStats post={post} refetch={refetch} />
      </div>

      <Link className="text-sm text-slate-500" href={`/p/${post.id}`}>
        {post.comments.length > 1
          ? `View all ${post.comments.length} comments`
          : post.comments.length === 1
          ? "View comment"
          : "No comments yet. Start a conversation!"}
      </Link>
    </div>
  );
};

export default Post;
