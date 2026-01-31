import { prisma } from "@/config/prisma";
import type { BlogPostType } from "@/types/posts.schema";
import type { User } from "@/types/users.schema";
import type {
  BlogPostGroupByOutputType,
  PickEnumerable,
} from "@generated/prisma/internal/prismaNamespace";
import { customAlphabet } from "nanoid";
import slugify from "slugify";

interface SelectUserPosts {
  userId: string;
  page: number;
  limit: number;
}
const nanoId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);

function generateSlug(title: string): string {
  const baseSlug = slugify(title, { lower: true, strict: true });
  const randomId = nanoId();
  return `${baseSlug}-${randomId}`;
}

export const insertPost = async (postData: BlogPostType, userId: string) => {
  await prisma.blogPost.create({
    data: {
      ...postData,
      slug: generateSlug(postData.title),
      authorId: userId,
    },
  });
};

export const selectUserPosts = async ({
  userId,
  page,
  limit,
}: SelectUserPosts) => {
  const paginatedPosts = await prisma.blogPost.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId: userId,
    },
  });
  const totalPosts = await prisma.blogPost.count({
    where: {
      authorId: userId,
    },
  });

  return { paginatedPosts, totalPosts };
};

export const selectUserPostDetails = async (postId: string, userId: string) => {
  return await prisma.blogPost.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
};

export const updateUserPost = async (
  postData: BlogPostType,
  postId: string,
  userId: string,
) => {
  return await prisma.blogPost.update({
    where: {
      id: postId,
      authorId: userId,
    },
    data: {
      ...postData,
    },
  });
};

export const deleteUserPost = async (postId: string, userId: string) => {
  await prisma.blogPost.delete({
    where: {
      id: postId,
      authorId: userId,
    },
  });
};

export const selectDashboardStats = async (userId: string) => {
  const stats = await prisma.blogPost.groupBy({
    by: ["published"],
    where: { authorId: userId },
    _count: { _all: true },
  });
  const published =
    stats.find(
      (s: PickEnumerable<BlogPostGroupByOutputType, "published"[]>) =>
        s.published,
    )?._count._all ?? 0;
  const drafts =
    stats.find(
      (s: PickEnumerable<BlogPostGroupByOutputType, "published"[]>) =>
        !s.published,
    )?._count._all ?? 0;

  return {
    totalPosts: published + drafts,
    publishedPosts: published,
    draftPosts: drafts,
    totalViews: 0,
  };
};

export const changeUserPostStatus = async (
  userId: string,
  postId: string,
  publishStatus: boolean,
) => {
  await prisma.blogPost.update({
    where: {
      id: postId,
      authorId: userId,
    },
    data: {
      published: !publishStatus,
    },
  });
};

export const selectPublishedPosts = async (page: number, limit: number) => {
  const paginatedPosts = await prisma.blogPost.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      published: true,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  const totalPosts = await prisma.blogPost.count({
    where: {
      published: true,
    },
  });

  return { paginatedPosts, totalPosts };
};

export const selectPublishedPostBySlug = async (slug: string) => {
  return await prisma.blogPost.findUnique({
    where: {
      slug,
    },
    include: {
      author: {
        select: {
          name: true,
          username: true,
          bio: true,
          website: true,
          image: true,
        },
      },
    },
  });
};

export const selectPublishedPostComments = async (postId: string) => {
  return await prisma.blogComment.findMany({
    where: {
      postId,
    },
    include: {
      author: {
        select: { name: true, username: true },
      },
    },
  });
};

export const insertComment = async (
  postId: string,
  authorId: string,
  content: string,
) => {
  await prisma.blogComment.create({
    data: {
      content,
      postId,
      authorId,
    },
  });
};

export const selectCheckUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user ? true : false;
};

export const updateUser = async (user: User, id: string) => {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...user,
    },
  });
};
