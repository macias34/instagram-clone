import { User } from "next-auth";
import Image from "next/image";
import { RouterOutputs } from "~/utils/api";

const Avatar = ({
  user,
  size = 25,
}: {
  user: User | RouterOutputs["post"]["getPostById"]["author"];
  size?: number;
}) => {
  if (!user) return <div />;

  return (
    <Image
      alt={`${user.name}'s image picture`}
      style={{ height: size }}
      src={
        user.image
          ? user.image
          : "https://scontent-ord5-2.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=1&_nc_ohc=-L25Q8dbzSkAX-APwMO&edm=AEsR1pMBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfBSyPOTLrcPdKOYqzEtvWUUu99ANORZwYPVhH-xjxyp4w&oe=6438B70F&_nc_sid=3f45ac"
      }
      width={size}
      height={size}
      className="rounded-full border border-slate-400"
    />
  );
};

export default Avatar;
