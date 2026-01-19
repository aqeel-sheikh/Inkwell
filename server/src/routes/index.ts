import { Router } from "express";
import { rootRouter } from "./root.routes";
import { postsRouter } from "@/routes/posts.routes";
import { dashboardRouter } from "./dashboard.routes";

const router = Router();

router.use("/", rootRouter);
router.use("/", postsRouter);
router.use("/", dashboardRouter);

export { router };
