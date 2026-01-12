import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

// Middleware
const createApp = () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/", (req: Request, res: Response) => {
    res.json({ message: "This is the backend server. Your API is running!" });
  });

  return app;
};

export default createApp;
