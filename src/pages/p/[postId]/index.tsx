import { GetStaticProps, NextPage } from "next";
import RootLayout from "~/components/layout";
import ImageSlider from "~/components/post/image-slider";
import PostContent from "~/components/post/post-content";
import LoadingSpinner from "~/components/ui/loading-spinner";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const PostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const {
    data: post,
    error: postError,
    refetch,
    isLoading,
  } = api.post.getPostById.useQuery(postId);

  if (!post || !post.images)
    return (
      <RootLayout>
        <div className="flex h-full w-full items-center justify-center">
          <h1>Post not found.</h1>
        </div>
      </RootLayout>
    );

  if (isLoading)
    return (
      <RootLayout>
        <div className="flex h-full w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      </RootLayout>
    );

  return (
    <RootLayout>
      <div className="flex h-full w-full flex-col items-center justify-center gap-14  xl:px-40 xl:py-10">
        <div className="flex h-full w-full flex-col border border-slate-300 xl:h-auto xl:flex-row">
          <ImageSlider images={post.images} />
          <div className="w-full xl:w-2/3">
            <PostContent post={post} refetch={refetch} />
          </div>
        </div>
      </div>
    </RootLayout>
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
