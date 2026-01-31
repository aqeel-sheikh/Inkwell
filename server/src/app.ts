import express from "express";
import cors from "cors";
import helmet from "helmet";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth";
import { router } from "./routes";
import "dotenv/config";

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.ADMIN_FRONTEND_URL,
      process.env.CLIENT_FRONTEND_URL,
    ].filter((url): url is string => typeof url === "string"),
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Better Auth
app.all("/api/auth{*any}", toNodeHandler(auth));

// Routes
app.use("/", router);

// For local development only
// const PORT = 3000
//  app.listen(PORT, (err) =>{
//   if (err)console.error("Cant start the server", err)
//   console.log(`Listning at http://localhost:${PORT}`)
// })

export default app;
