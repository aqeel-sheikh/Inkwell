// import createApp from "./app.js";
// import dotenv from "dotenv";
// import type { IncomingMessage, ServerResponse } from "http";

// dotenv.config();
// const PORT = process.env.PORT || 3000;
// const isVercel = process.env.VERCEL === "1";

// let cachedApp: ReturnType<typeof createApp> | null = null;

// /**
//  * Fast path for GET / on Vercel: respond immediately without loading Prisma/Better Auth.
//  * Avoids 300s timeout when "visiting" the deployed backend URL.
//  */
// function vercelHandler(
//   req: IncomingMessage,
//   res: ServerResponse,
//   next?: () => void
// ): void {
//   const path = req.url?.split("?")[0] ?? "";
//   if (req.method === "GET" && (path === "/" || path === "")) {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/html");
//     res.end("<h1>Inkwell API is running</h1>");
//     return;
//   }
//   if (!cachedApp) cachedApp = createApp();
//   // Vercel passes Node req/res; Express accepts them at runtime.
//   (cachedApp as (req: IncomingMessage, res: ServerResponse, next?: () => void) => void)(req, res, next);
// }

// if (!isVercel) {
//   const app = createApp();
//   cachedApp = app;
//   app.listen(PORT, (err: unknown) => {
//     if (err) console.error("Can't start the server", err);
//     console.log(`Server is listening at Port:${PORT}`);
//   });
// }

// export default isVercel ? vercelHandler : cachedApp!;
