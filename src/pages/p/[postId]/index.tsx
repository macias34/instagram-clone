import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import RootLayout from "~/components/layout";
import LoadingSpinner from "~/components/ui/loading-spinner";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import { PostContext } from "contexts/post-context";
import Post from "~/components/post/post";

const PostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const {
    data: post,
    error: postError,
    refetch,
    isLoading,
  } = api.post.getPostById.useQuery(postId);

  if (!post || !post.images || postError)
    return (
      <RootLayout>
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 max-xl:absolute max-xl:left-1/2 max-xl:top-1/2 max-xl:-translate-x-1/2 max-xl:-translate-y-1/2">
          <h1>Post not found.</h1>
          <Link className="font-semibold" href="/">
            Go back to the home page
          </Link>
        </div>
      </RootLayout>
    );

  if (isLoading)
    return (
      <RootLayout>
        <div className="flex h-full w-full items-center justify-center max-xl:absolute max-xl:left-1/2 max-xl:top-1/2 max-xl:-translate-x-1/2 max-xl:-translate-y-1/2">
          <LoadingSpinner />
        </div>
      </RootLayout>
    );

  return (
    <PostContext.Provider value={{ post, refetch }}>
      <RootLayout>
        <div className="flex h-full w-full flex-col items-center justify-center gap-14  xl:px-40 xl:py-10">
          <Post />
        </div>
      </RootLayout>
    </PostContext.Provider>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const postId = context.params?.postId;
  if (typeof postId !== "string") throw new Error("No postId provided");

  await ssg.post.getPostById.prefetch(postId);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      postId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default PostPage;
