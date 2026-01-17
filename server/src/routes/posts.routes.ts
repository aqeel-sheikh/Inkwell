import { Router } from "express";
import { createPost, getUserPosts } from "@/controllers/posts.controller";
import { requireAuth } from "@/middleware/requireAuth.middleware";

const postsRouter = Router();

postsRouter.get("/api/posts", requireAuth, getUserPosts);
postsRouter.post("/api/posts", requireAuth, createPost);

export { postsRouter };
