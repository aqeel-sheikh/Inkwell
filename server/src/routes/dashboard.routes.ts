import { Router } from "express";
import { requireAuth } from "@/middleware/requireAuth.middleware";
import { getDashboardStats } from "@/controllers/dashboard.controller";

const dashboardRouter = Router();

dashboardRouter.use(requireAuth);

dashboardRouter.get("/api/dashboard/stats", getDashboardStats);

export { dashboardRouter };
