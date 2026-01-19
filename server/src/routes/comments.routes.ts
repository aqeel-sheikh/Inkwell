import { Router } from "express";
import { requireAuth } from "@/middleware/requireAuth.middleware";
import { getPublishedPostComments } from "@/controllers/comments.controller";

const commentsRouter = Router();

commentsRouter.get("/api/public/posts/:postId/comments", getPublishedPostComments);
commentsRouter.post("/api/comments", )

export {commentsRouter}