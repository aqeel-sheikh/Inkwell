import type { Request, Response } from "express";
import { blogPostSchema } from "@/types/posts.schema";
import { insertPost } from "@/db/queries";

export const createPost = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const result = blogPostSchema.safeParse(req.body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
    });
    res.status(400).json(fieldErrors);
    return;
  }
  try {
    await insertPost(result.data, userId);
    res.status(201).json({ message: "Post Created" });
  } catch (err: unknown) {
    res.status(500).json({
      message: "Something went wrong! Please try again after sometime",
    });
    console.log("Post insertion failed: ", err);
  }
  return;
};


