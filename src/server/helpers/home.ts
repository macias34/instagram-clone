import { Comment, Follower, Image, Like, Post } from "@prisma/client";
import { Context } from "../api/root";
import { TRPCError } from "@trpc/server";

export type SafePost = Post & {
  author: {
    image: string | null;
    posts: Post[];
    followers: Follower[];
    id: string;
    name: string | null;
    username: string | null;
    bio: string | null;
  };
  images: Image[];
  likes: Like[];
  comments: Comment[];
};

export const getPostsWithData = async (posts: SafePost[], ctx: Context) => {
  const postsWithData = await Promise.all(
    posts.map(async (post) => {
      const commentUserIds = post.comments.map((comment) => comment.userId);
      const commenters = await ctx.prisma.user.findMany({
        where: {
          id: {
            in: commentUserIds,
          },
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          followers: {
            select: {
              followerId: true,
            },
          },
        },
      });

      if (!commenters)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unexpected error while getting commenters.",
        });

      const comments = post.comments.map((comment) => {
        return {
          ...comment,
          commentAuthor: commenters.find(
            (commenter) => commenter.id === comment.userId
          ),
        };
      });

      const likerIds = post.likes.map((like) => like.userId);

      const likers = await ctx.prisma.user.findMany({
        where: {
          id: {
            in: likerIds,
          },
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          followers: {
            select: {
              followerId: true,
            },
          },
        },
      });

      return {
        ...post,
        comments,
        likers,
      };
    })
  );

  return postsWithData;
};

export const getFollowingIds = async (ctx: Context) => {
  const retrievedFollowings = await ctx.prisma.follower.findMany({
    where: {
      followerId: ctx.session?.user.id,
    },
  });
  const followingIds = retrievedFollowings.map(
    (following) => following.followedId
  );

  return followingIds;
};

interface GetPostsByFollowingIds {
  followingIds: string[];
  limit: number;
  cursor: any;
  ctx: Context;
  mode: "in" | "notIn";
}

export const getPostsByFollowingIds = async ({
  followingIds,
  limit,
  ctx,
  cursor,
  mode,
}: GetPostsByFollowingIds) => {
  return await ctx.prisma.post.findMany({
    where: {
      authorId: {
        [mode]: followingIds,
      },
    },
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          bio: true,
          followers: true,
          id: true,
          image: true,
          name: true,
          username: true,
          posts: true,
        },
      },
      images: true,
      likes: true,
      comments: true,
    },
  });
};
