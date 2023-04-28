import { GetStaticProps, NextPage } from "next";
import RootLayout from "~/components/layout";
import { Separator } from "~/components/ui/seperator";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import ProfileHeader from "~/components/profile/profile-header";
import ProfileFeed from "~/components/profile/profile-feed";
import LoadingSpinner from "~/components/ui/loading-spinner";
import Link from "next/link";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const {
    data: posts,
    error: postsError,
    isLoading: arePostsLoading,
  } = api.post.getPostsByUsername.useQuery(username, { refetchOnMount: true });

  const {
    data: userData,
    error: userDataError,
    refetch,
    isLoading: isUserDataLoading,
  } = api.user.getUserPublicDataByUsername.useQuery(username, {
    refetchOnMount: true,
  });

  if (isUserDataLoading || arePostsLoading)
    return (
      <RootLayout>
        <div className="flex h-full w-full items-center justify-center max-xl:absolute max-xl:left-1/2 max-xl:top-1/2 max-xl:-translate-x-1/2 max-xl:-translate-y-1/2">
          <LoadingSpinner />
        </div>
      </RootLayout>
    );

  if (postsError || userDataError) {
    return (
      <RootLayout>
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 max-xl:absolute max-xl:left-1/2 max-xl:top-1/2 max-xl:-translate-x-1/2 max-xl:-translate-y-1/2">
          <h1>No user with this username.</h1>
          <Link className="font-semibold" href="/">
            Go back to the home page
          </Link>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="flex h-full flex-col gap-10 py-10 xl:gap-14 xl:px-40">
        {userData && <ProfileHeader userData={userData} refetch={refetch} />}
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
