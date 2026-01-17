import { Router } from "express";
import { rootController } from "../controllers/root.controller.js";

const rootRouter = Router();

rootRouter.get("/", rootController);

export { rootRouter };
