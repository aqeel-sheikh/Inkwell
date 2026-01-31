import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "@/lib/auth";
import type { AuthenticatedRequest } from "@/types/types";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    (req as AuthenticatedRequest).userId = session.user.id;
    (req as AuthenticatedRequest).username = session.user.username;
    next();
  } catch (error) {
    console.error("Invalid session", error);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
