import { PostContext } from "contexts/post-context";
import dayjs from "dayjs";
import Link from "next/link";
import { useContext } from "react";
import Avatar from "~/components/ui/avatar";

const HomePostHeader = () => {
  const { post } = useContext(PostContext)!;

  return (
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
  );
};

export default HomePostHeader;
