import { checkUsername } from "@/controllers/users.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/api/check-username", checkUsername);

export { userRouter };
