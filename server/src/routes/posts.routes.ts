import { Router } from "express";
import {
  createPost,
  getUserPosts,
  getPostDetails,
  editUserPost,
  removeUserPost,
  getPublishedPosts,
  getPublishedPostBySlug,
  getPublishedPostComments,
} from "@/controllers/posts.controller";
import { requireAuth } from "@/middleware/requireAuth.middleware";

const postsRouter = Router();

postsRouter.get("/api/posts", requireAuth, getUserPosts);
postsRouter.post("/api/posts", requireAuth, createPost);

postsRouter.get("/api/posts/:postId", requireAuth, getPostDetails);
postsRouter.patch("/api/posts/:postId", requireAuth, editUserPost);

postsRouter.delete("/api/posts/:postId", requireAuth, removeUserPost);

// Public
postsRouter.get("/api/public/posts", getPublishedPosts);
postsRouter.get("/api/public/posts/:slug", getPublishedPostBySlug);
postsRouter.get("/api/public/posts/:postId/comments", getPublishedPostComments);

export { postsRouter };
