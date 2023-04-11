import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import RootLayout from "~/components/layout";
import Avatar from "~/components/profile/avatar";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const PostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const {
    data: post,
    error: postError,
    refetch,
  } = api.post.getPostById.useQuery(postId);
  const { data: sessionData } = useSession();

  if (!post || !post.images)
    return <p>Something went wrong while getting this post.</p>;

  const [currentPreviewedImage, setCurrentPreviewedImage] = useState(0);

  const [isFollowed, setIsFollowed] = useState(
    post?.author?.followers.some(
      (follower) => follower.followerId === sessionData?.user.id
    )
  );

  const { mutate: toggleFollowInDb } =
    api.user.toggleFollowByUserID.useMutation({
      onSettled() {
        refetch();
      },
    });

  const toggleFollow = () => {
    if (!sessionData) return;

    setIsFollowed((prevState) => !prevState);
    toggleFollowInDb(post.authorId);
  };

  useEffect(() => {
    setIsFollowed(
      post?.author?.followers.some(
        (follower) => follower.followerId === sessionData?.user.id
      )
    );
  }, [sessionData]);

  return (
    <RootLayout>
      <div className="flex h-full w-full flex-col gap-14 px-40 py-10">
        <div className="flex h-[90%] w-full border border-slate-300">
          <div className="relative aspect-square h-full">
            {post?.images.map((image, index) => (
              <Image
                key={image.id}
                src={image.src}
                priority
                alt="Preview image"
                style={{ objectFit: "cover" }}
                className={`${
                  currentPreviewedImage !== index && "invisible"
                } rounded-bl-lg brightness-110`}
                fill
              />
            ))}
            {currentPreviewedImage < post.images.length - 1 && (
              <div
                onClick={() =>
                  setCurrentPreviewedImage((prevState) => prevState + 1)
                }
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
              >
                <ChevronRight className="text-white" />
              </div>
            )}

            {currentPreviewedImage !== 0 && (
              <div
                onClick={() =>
                  setCurrentPreviewedImage((prevState) => prevState - 1)
                }
                className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.65)] transition hover:bg-[rgba(0,0,0,0.5)]"
              >
                <ChevronLeft className="text-white" />
              </div>
            )}
          </div>

          <div className="flex w-full flex-col">
            <div className="flex items-center gap-3 border-b border-b-slate-200 px-3.5 py-3.5 text-sm  font-semibold">
              <Avatar user={post.author} size={32} />
              <Link href={`/${post.author?.username}`}>
                <span>{post.author?.username}</span>
              </Link>
              {isFollowed ? (
                <span
                  onClick={toggleFollow}
                  className="cursor-pointer text-slate-800 hover:text-slate-400"
                >
                  Following
                </span>
              ) : (
                <span
                  onClick={toggleFollow}
                  className="cursor-pointer text-blue-600 hover:text-slate-700"
                >
                  Follow
                </span>
              )}
            </div>
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
