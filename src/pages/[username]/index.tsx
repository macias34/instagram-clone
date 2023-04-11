import { GetStaticProps, NextPage } from "next";
import RootLayout from "~/components/layout";
import { Separator } from "~/components/ui/seperator";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import ProfileHeader from "~/components/profile/profile-header";
import ProfileFeed from "~/components/profile/profile-feed";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data: posts, error: postsError } =
    api.post.getPostsByUsername.useQuery(username);

  const { data: userData, error: userDataError } =
    api.user.getUserPublicDataByUsername.useQuery(username);

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
