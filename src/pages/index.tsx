import { type NextPage } from "next";
import { Fragment, useState } from "react";
import Post from "~/components/home/post";
import RootLayout from "~/components/layout";
import { Separator } from "~/components/ui/seperator";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, fetchNextPage, refetch } =
    api.home.getBatchPosts.useInfiniteQuery(
      {
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const handleFetchNextPage = () => {
    fetchNextPage();
  };

  return (
    <RootLayout>
      <div className="flex w-full py-10 ">
        <div className="flex w-full">
          <div className="ml-48 flex flex-col gap-5">
            {data?.pages.map(({ posts }) =>
              posts.map((post) => (
                <Fragment key={post.id}>
                  <Post post={post} refetch={refetch} />
                  <Separator />
                </Fragment>
              ))
            )}

            <button onClick={handleFetchNextPage}>Load more posts</button>
          </div>

          <div>Instagram</div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
