import { prisma } from "@/config/prisma";
import type { BlogPostType } from "@/types/posts.schema";

export const insertPost = async (postData: BlogPostType, userId: string) => {
  await prisma.blogPost.create({
    data: {
      ...postData,
      authorId: userId,
    },
  });
};
