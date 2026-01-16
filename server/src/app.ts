import express from "express";
import cors from "cors";
import helmet from "helmet";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth";
import "dotenv/config";

import { router } from "./routes";

const createApp = () => {
  const app = express();
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.ADMIN_FRONTEND_URL,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Better Auth
  app.all("/api/auth{*any}", toNodeHandler(auth));

  // Routes
  app.use("/", router);

  return app;
};

export default createApp;
