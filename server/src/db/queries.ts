import { prisma } from "@/config/prisma";
import type { BlogPostType } from "@/types/posts.schema";

export const insertPost = async (postData: BlogPostType, userId: string) => {
  try {
    await prisma.blogPost.create({
      data: {
        ...postData,
        authorId: userId,
      },
    });
  } catch (error) {
    console.error("Failed to insert blog post:", error);
    throw new Error("Could not create blog post");
  }
};
