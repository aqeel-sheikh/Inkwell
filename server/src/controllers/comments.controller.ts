import type { Request, Response } from "express";
import { selectPublishedPostComments } from "@/db/queries";

export const getPublishedPostComments = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const postId = req.params.postId as string;
  
    try {
      const comments = await selectPublishedPostComments(postId);
      return res.status(200).json(comments);
    } catch (err) {
      console.error("Couldn't fetch the public post comments: ", err);
      return res
        .status(500)
        .json({ message: "Something went wrong! Failed to load comments" });
    }
  };
  