import { Router } from "express";
import { rootRouter } from "./root.routes";
import {postsRouter} from "@/routes/posts.routes"

const router = Router();

router.use("/", rootRouter);
router.use("/", postsRouter);

export { router };
