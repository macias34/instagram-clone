import { GetStaticProps, NextPage } from "next";
import RootLayout from "~/components/layout";
import ImageSlider from "~/components/post/image-slider";
import PostContent from "~/components/post/post-content";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const PostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const {
    data: post,
    error: postError,
    refetch,
  } = api.post.getPostById.useQuery(postId);

  if (!post || !post.images)
    return <p>Something went wrong while getting this post.</p>;

  return (
    <RootLayout>
      <div className="flex h-full w-full flex-col gap-14 px-40 py-10">
        <div className="flex h-[600px] border border-slate-300">
          <ImageSlider images={post.images} />
          <PostContent post={post} refetch={refetch} />
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
