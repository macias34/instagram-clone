import { type NextPage } from "next";
import { Fragment, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "~/components/home/post";
import RootLayout from "~/components/layout";
import LoadingSpinner from "~/components/ui/loading-spinner";
import { Separator } from "~/components/ui/seperator";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const {
    data: followingPosts,
    fetchNextPage: fetchNextFollowingsPage,
    refetch: refetchFollowings,
    hasNextPage: hasNextFollowingsPage,
    isLoading: isFollowingsPostsLoading,
  } = api.home.getBatchFollowersPosts.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const {
    data: nonFollowingPosts,
    fetchNextPage,
    refetch: refetchNonFollowings,
    hasNextPage,
    isLoading: isNonFollowingsPostsLoading,
  } = api.home.getBatchPosts.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const refetch = () => {
    refetchFollowings();
    refetchNonFollowings();
  };

  const pages = [
    hasNextFollowingsPage ? followingPosts?.pages : followingPosts?.pages,
    nonFollowingPosts?.pages,
  ]; // If there are any more posts from users you follow, display only this posts, if not display posts from users you follow and from who you don't

  if (isFollowingsPostsLoading || isNonFollowingsPostsLoading)
    return (
      <RootLayout>
        <div className="flex h-full w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      </RootLayout>
    );

  return (
    <RootLayout>
      <div className="flex w-full py-5 xl:py-10">
        <div className="flex w-full flex-col gap-5 ">
          <InfiniteScroll
            className="flex w-fit flex-col gap-5 px-5 xl:ml-48"
            dataLength={2}
            next={
              hasNextFollowingsPage! ? fetchNextFollowingsPage : fetchNextPage
            }
            hasMore={hasNextFollowingsPage! || hasNextPage!}
            loader={<span className="text-sm">Loading more posts..</span>}
            endMessage={
              <span className="text-sm">
                You have already viewed all posts on this page! Amazing job 😎
              </span>
            }
          >
            {pages?.map((page) =>
              page?.map((nestedPage) =>
                nestedPage.posts.map((post) => (
                  <Fragment key={post.id}>
                    <Post post={post} refetch={refetch} />
                    <Separator />
                  </Fragment>
                ))
              )
            )}
          </InfiniteScroll>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
