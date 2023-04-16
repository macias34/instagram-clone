import { type NextPage } from "next";
import { Fragment, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "~/components/home/post";
import RootLayout from "~/components/layout";
import { Separator } from "~/components/ui/seperator";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, fetchNextPage, refetch, hasNextPage } =
    api.home.getBatchPosts.useInfiniteQuery(
      {
        limit: 2,
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
          <InfiniteScroll
            className="ml-48 flex flex-col items-center gap-5"
            dataLength={2}
            next={handleFetchNextPage}
            hasMore={hasNextPage!}
            endMessage={
              <span className="text-sm">
                You have no more posts to see. Try following more users.
              </span>
            }
            loader={<span className="text-sm">Loading more posts..</span>}
          >
            {data?.pages.map(({ posts }) =>
              posts.map((post) => (
                <Fragment key={post.id}>
                  <Post post={post} refetch={refetch} />
                  <Separator />
                </Fragment>
              ))
            )}
          </InfiniteScroll>
          <div>Instagram</div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
