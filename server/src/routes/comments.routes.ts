import { Router } from "express";
import { requireAuth } from "@/middleware/requireAuth.middleware";
import {
  getPublishedPostComments,
  createComment,
} from "@/controllers/comments.controller";

const commentsRouter = Router();

commentsRouter.get(
  "/api/public/posts/:postId/comments",
  getPublishedPostComments,
);
commentsRouter.post("/api/comments", requireAuth, createComment);

export { commentsRouter };
