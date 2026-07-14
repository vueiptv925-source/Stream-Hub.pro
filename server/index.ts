import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import path from "path";
const __dirname = path.resolve(__filename, "..");

// Backend
import { ProviderManager } from "./src/providers/index.js";
import { cache } from "./src/utils/cache.js";

const app = express();
const server = createServer(app);
const providerManager = new ProviderManager();

// ============ Security & Middleware ============
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// ============ Rate Limiting ============
app.use(rateLimit({
  windowMs: 60000,
  max: 60,
  message: { success: false, error: "Too many requests" }
}));

// ============ API Routes ============
app.get("/api/health", (req, res) => {
  res.json({
    name: "Stream-Hub.pro",
    version: "2.0.0",
    status: "operational",
    uptime: process.uptime(),
    endpoints: {
      movie: "/api/movie/:id",
      tv: "/api/tv/:id/:season/:episode"
    }
  });
});

app.get("/api/movie/:id", async (req, res) => {
  const { id } = req.params;
  const cacheKey = `movie:${id}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  const result = await providerManager.getMovieSources(id);
  if (result.success) {
    cache.set(cacheKey, result);
    return res.json(result);
  }
  res.status(404).json(result);
});

app.get("/api/tv/:id/:season/:episode", async (req, res) => {
  const { id, season, episode } = req.params;
  const cacheKey = `tv:${id}:${season}:${episode}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  const result = await providerManager.getTVSources(id, parseInt(season), parseInt(episode));
  if (result.success) {
    cache.set(cacheKey, result);
    return res.json(result);
  }
  res.status(404).json(result);
});

// ============ Serve Static Frontend ============
const staticPath = path.resolve(__dirname, "public");
app.use(express.static(staticPath));

// Handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// ============ Start ============
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Stream-Hub.pro running on port ${port}`);
  console.log(`Frontend: http://localhost:${port}`);
  console.log(`API: http://localhost:${port}/api/movie/:id`);
  console.log(`Cache TTL: ${parseInt(process.env.CACHE_TTL || "3600")}s`);
});
