import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import RootLayout from "~/components/layout";
import Avatar from "~/components/profile/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/seperator";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { RouterOutputs, api } from "~/utils/api";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { HiSquare2Stack } from "react-icons/hi2";

const ProfileHeader = ({
  userData,
}: {
  userData: RouterOutputs["user"]["getUserPublicDataByUsername"];
}) => {
  return (
    <div className="flex gap-24 pl-20 pr-52">
      <Avatar user={userData} size={150} />
      <div className="flex grow flex-col gap-5">
        <div className="flex items-center gap-10">
          <span className="text-lg font-normal">{userData.username}</span>
          <div className="flex gap-2">
            <Button variant="instagram" size="instagram">
              Follow
            </Button>
            <Button variant="instagram" size="instagram">
              Message
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <span className="text-base">
            <span className="font-semibold">3470</span> posts
          </span>
          <span className="text-base">
            <span className="font-semibold">500</span> followers
          </span>
          <span className="text-base">
            <span className="font-semibold">200</span> followings
          </span>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <span className="font-semibold">{userData.name}</span>
          <span>Hello im a profesional futbool player :).</span>
        </div>
      </div>
    </div>
  );
};

const ProfileFeed = ({
  posts,
}: {
  posts: RouterOutputs["post"]["getPostsByUsername"];
}) => {
  return (
    <div className="flex h-full grow items-center">
      <div className="flex h-full grow flex-wrap gap-1">
        {posts.map((post) => (
          <div className="group relative aspect-square w-[33%]">
            <Link className="h-full w-full" href={`/p/${post.id}`}>
              <Image
                fill
                style={{ objectFit: "cover" }}
                alt=""
                src={post.images[1]?.src!}
              />

              {post.images.length > 1 && (
                <div className="absolute right-2 top-2 text-white">
                  <HiSquare2Stack size="25" />
                </div>
              )}

              <div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center gap-7 bg-[rgba(0,0,0,0.3)] text-lg font-bold text-white group-hover:flex">
                <span className="flex items-center gap-2">
                  <AiFillHeart size="25" /> 200
                </span>
                <span className="flex items-center gap-2">
                  <FaComment size="20" /> 10
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data: posts, error: postsError } =
    api.post.getPostsByUsername.useQuery(username);

  const { data: userData, error: userDataError } =
    api.user.getUserPublicDataByUsername.useQuery(username);

  console.log(posts, userData);

  return (
    <RootLayout>
      <div className="flex h-full flex-col gap-14 px-40 py-10">
        {userData && <ProfileHeader userData={userData} />}
        <Separator />
        {posts && <ProfileFeed posts={posts} />}
      </div>
    </RootLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const username = context.params?.username;
  if (typeof username !== "string") throw new Error("No username provided");

  await ssg.post.getPostsByUsername.prefetch(username);
  await ssg.user.getUserPublicDataByUsername.prefetch(username);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
