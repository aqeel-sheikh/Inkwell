import { Router } from "express";
import { createPost } from "@/controllers/posts.controller";
import { requireAuth } from "@/middleware/requireAuth.middleware";

const postsRouter = Router();

postsRouter.post("/api/posts", requireAuth, createPost);

export { postsRouter };
