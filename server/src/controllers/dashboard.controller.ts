import type { Request, Response } from "express";
import { selectDashboardStats } from "@/db/queries";

export const getDashboardStats = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = (req as any).userId;

  try {
    const { totalPosts, publishedPosts, draftPosts, totalViews } =
      await selectDashboardStats(userId);
    return res
      .status(200)
      .json({ totalPosts, publishedPosts, draftPosts, totalViews });
  } catch (err) {
    console.error("Failed to get the dashboard stats: ", err);
    return res
      .status(500)
      .json({ message: "Something went worng! Failed to fetch stats" });
  }
};
