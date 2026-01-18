import type { Request, Response } from "express";
import { blogPostSchema } from "@/types/posts.schema";
import {
  insertPost,
  selectUserPosts,
  selectUserPostDetails,
  updateUserPost,
} from "@/db/queries";

export const createPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = (req as any).userId;

  const result = blogPostSchema.safeParse(req.body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
    });
    return res.status(400).json(fieldErrors);
  }
  try {
    await insertPost(result.data, userId);
    return res.status(201).json({ message: "Post Created" });
  } catch (err: unknown) {
    console.log("Post insertion failed: ", err);
    return res.status(500).json({
      message: "Something went wrong! Please try again after sometime",
    });
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = (req as any).userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  try {
    const posts = await selectUserPosts({ userId, page, limit });
    const total = posts.length;
    return res.status(200).json({
      data: posts,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.log("Post fetch failed: ", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPostDetails = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const postId = req.params.postId as string;

  try {
    const post = await selectUserPostDetails(userId, postId);
    return res.status(200).json(post);
  } catch (err) {
    console.error("Couldn't fetch the post details: ", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const editUserPost = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const postId = req.params.postId as string;

  const result = blogPostSchema.safeParse(req.body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
    });
    return res.status(400).json(fieldErrors);
  }

  try {
    const data = await updateUserPost(result.data, postId, userId);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Couldn't update user post: ", err);
    return res
      .status(500)
      .json({ message: "Something went wrong! Failed update post details" });
  }
};
