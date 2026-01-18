import { prisma } from "@/config/prisma";
import type { BlogPostType } from "@/types/posts.schema";

interface SelectUserPosts {
  userId: string;
  page: number;
  limit: number;
}

export const insertPost = async (postData: BlogPostType, userId: string) => {
  await prisma.blogPost.create({
    data: {
      ...postData,
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
