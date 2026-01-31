import createApp from "./app.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = createApp();

if (process.env.VERCEL !== "1") {
  app.listen(PORT, (err: unknown) => {
    if (err) console.error("Can't start the server", err);
    console.log(`Server is listening at Port:${PORT}`);
  });
}

export default app;
