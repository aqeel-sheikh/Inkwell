import { Router } from "express";
import {
  createPost,
  getUserPosts,
  getPostDetails,
  editUserPost,
} from "@/controllers/posts.controller";
import { requireAuth } from "@/middleware/requireAuth.middleware";

const postsRouter = Router();

postsRouter.get("/api/posts", requireAuth, getUserPosts);
postsRouter.post("/api/posts", requireAuth, createPost);

postsRouter.get("/api/posts/:postId", requireAuth, getPostDetails);
postsRouter.patch("/api/posts/:postId", requireAuth, editUserPost);

export { postsRouter };
