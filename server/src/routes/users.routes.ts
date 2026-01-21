import {
  checkUsername,
  updateUserProfile,
} from "@/controllers/users.controller";
import { requireAuth } from "@/middleware/requireAuth.middleware";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/api/check-username", checkUsername);
userRouter.patch("/api/me", requireAuth, updateUserProfile);

export { userRouter };
