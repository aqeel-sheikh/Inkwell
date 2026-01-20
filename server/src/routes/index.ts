import { Router } from "express";
import { rootRouter } from "./root.routes";
import { postsRouter } from "@/routes/posts.routes";
import { dashboardRouter } from "./dashboard.routes";
import { commentsRouter } from "./comments.routes";
import { userRouter } from "./users.routes";

const router = Router();

router.use("/", rootRouter);
router.use("/", userRouter);
router.use("/", postsRouter);
router.use("/", commentsRouter);
router.use("/", dashboardRouter);

export { router };
