import { RouterOutputs } from "~/utils/api";
import { BsCameraFill } from "react-icons/bs";
import PostSquare from "./post-square/post-square";

const ProfileFeed = ({
  posts,
}: {
  posts: RouterOutputs["post"]["getPostsByUsername"];
}) => {
  return (
    <div className="flex h-full grow items-center">
      <div className="flex h-full grow flex-wrap justify-between gap-1">
        {posts.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <BsCameraFill size="30" />
            <span className="text-2xl font-semibold">No posts yet</span>
          </div>
        )}

        {posts.map((post) => (
          <PostSquare key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfileFeed;
