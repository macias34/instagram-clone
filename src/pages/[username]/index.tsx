import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import RootLayout from "~/components/layout";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.post.getPostsByUsername.useQuery(username);
  console.log(data);

  return <RootLayout>{username}</RootLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const username = context.params?.username;
  if (typeof username !== "string") throw new Error("No username provided");

  await ssg.post.getPostsByUsername.prefetch(username);

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
