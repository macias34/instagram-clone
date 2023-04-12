import Link from "next/link";
import Avatar from "../profile/avatar";
import { RouterOutputs, api } from "~/utils/api";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { Textarea } from "../ui/textarea";

const AddComment = () => {
  const initialValues = {
    content: "",
  };
  const onAddComment = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onAddComment}>
      {({ submitForm }) => (
        <Form className="flex w-full items-center gap-2 p-3.5">
          <Field
            as={Textarea}
            spellCheck={false}
            name="caption"
            maxLength={2200}
            placeholder="Add a comment"
            className=" h-10 max-h-14 resize-none rounded-none border-transparent px-0 pr-5 text-sm outline-none placeholder:text-slate-400 focus:ring-0 focus:ring-transparent focus:ring-offset-0"
          />
          <button
            onClick={submitForm}
            className="bg-transparent font-semibold text-blue-600 hover:text-slate-800"
          >
            Post
          </button>
        </Form>
      )}
    </Formik>
  );
};

const PostContent = ({
  post,
}: {
  post: RouterOutputs["post"]["getPostById"];
}) => {
  const { data: sessionData } = useSession();
  const [isFollowed, setIsFollowed] = useState(
    post?.author?.followers.some(
      (follower) => follower.followerId === sessionData?.user.id
    )
  );

  const { mutate: toggleFollowInDb } =
    api.user.toggleFollowByUserID.useMutation();

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
    <div className="flex w-full flex-col">
      <div className="flex items-center gap-3 border-b border-b-slate-200 px-3.5 py-3.5 text-sm  font-semibold">
        <Avatar user={post.author} size={32} />
        <Link href={`/${post.author?.username}`}>
          <span>{post.author?.username}</span>
        </Link>
        {post.authorId !== sessionData?.user.id && (
          <>
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
          </>
        )}
      </div>

      <div className="h-[63%] w-full overflow-x-auto border-b border-b-slate-200 px-3.5 py-3.5">
        elo
      </div>

      <div className="flex w-full flex-col gap-3 border-b border-b-slate-200 p-3.5">
        <div className="flex items-center gap-4">
          <span>
            <svg
              aria-label="Like"
              color="rgb(38, 38, 38)"
              fill="rgb(38, 38, 38)"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Like</title>
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>
          </span>
          <span>
            <svg
              aria-label="Comment"
              color="rgb(0, 0, 0)"
              fill="rgb(0, 0, 0)"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Comment</title>
              <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
          </span>
        </div>
        <div className="flex flex-col ">
          <span className="text-sm font-semibold">
            {post.likes.length} likes
          </span>
          <span className="text-xs text-slate-500">
            {dayjs(post.createdAt).format("DD MMMM, YYYY")}
          </span>
        </div>
      </div>
      <AddComment />
    </div>
  );
};

export default PostContent;
