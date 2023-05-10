import { User } from "next-auth";
import Image from "next/image";
import { RouterOutputs } from "~/utils/api";

interface AvatarProps {
  user: User | RouterOutputs["post"]["getPostById"]["author"];
  size?: number;
}

const Avatar = ({ user, size = 25 }: AvatarProps) => {
  if (!user) return <div />;

  return (
    <Image
      alt={`${user.name}'s image picture`}
      style={{ height: size }}
      src={
        user.image
          ? user.image
          : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
      }
      width={size}
      height={size}
      className="rounded-full border border-slate-400"
    />
  );
};

export default Avatar;
