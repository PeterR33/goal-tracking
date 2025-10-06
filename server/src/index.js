// server/src/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db.js";
import goalsRouter from "./routes/goals.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Middleware */
app.use(express.json());

// Allow CORS only in dev (in prod we serve front + API from same origin)
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

/** API routes */
app.use("/api/goals", goalsRouter);
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

/** Serve React build in production */
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientDist));
  // Use a regex catch-all that works with path-to-regexp v6
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

/** Start */
const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`)))
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
