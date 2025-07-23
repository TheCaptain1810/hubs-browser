import express from "express";
import session from "cookie-session";

import { PORT, SERVER_SESSION_SECRET } from "./config.js";
import authRoutes from "./routes/auth.js";
import hubsRoutes from "./routes/hubs.js";

let app = express();

app.use(
  session({ secret: SERVER_SESSION_SECRET, maxAge: 24 * 60 * 60 * 1000 })
);
app.use(authRoutes);
app.use(hubsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
