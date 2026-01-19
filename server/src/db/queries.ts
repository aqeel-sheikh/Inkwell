import { prisma } from "@/config/prisma";
import type { BlogPostType } from "@/types/posts.schema";
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
  return await prisma.blogPost.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      authorId: userId,
    },
  });
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
  const published = stats.find((s) => s.published)?._count._all ?? 0;
  const drafts = stats.find((s) => !s.published)?._count._all ?? 0;

  return {
    totalPosts: published + drafts,
    publishedPosts: published,
    draftPosts: drafts,
    totalViews: 0,
  };
};

export const selectPublishedPosts = async () => {
  return await prisma.blogPost.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
};

export const selectPublishedPostBySlug = async (slug: string) => {
  return await prisma.blogPost.findUnique({
    where: {
      slug,
    },
    include: {
      author: {
        select: { name: true },
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
        select: { name: true },
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
