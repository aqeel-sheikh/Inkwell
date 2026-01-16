import { Router } from "express";
import { rootRouter } from "./root.routes";

const router = Router();

router.use("/", rootRouter);

export { router };
