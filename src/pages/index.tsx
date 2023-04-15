import { type NextPage } from "next";
import { useState } from "react";
import Post from "~/components/home/post";
import RootLayout from "~/components/layout";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, fetchNextPage } = api.home.getBatchPosts.useInfiniteQuery(
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
        <div className="flex w-full gap-10">
          <div className="ml-48 flex flex-col gap-10">
            {data?.pages.map(({ posts }) =>
              posts.map((post) => <Post key={post.id} post={post} />)
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
