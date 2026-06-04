const cors = require("cors");
const express = require("express");
const appDataRoutes = require("./routes/appDataRoutes");
const authRoutes = require("./routes/authRoutes");
const depressionRiskRoutes = require("./routes/depressionRiskRoutes");
const healthRoutes = require("./routes/healthRoutes");
const moodEngineRoutes = require("./routes/moodEngineRoutes");
const profileRoutes = require("./routes/profileRoutes");
const stressEngineRoutes = require("./routes/stressEngineRoutes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const dailyLogRoutes = require("./routes/dailyLogRoutes");
const { env } = require("./utils/env");
const goalRoutes = require("./routes/goalRoutes");
const reflectionRoutes = require("./routes/reflectionRoutes");
const plannerRoutes = require("./routes/plannerRoutes");

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "MoodSense AI API is running",
    health: "/health",
  });
});

app.use("/health", healthRoutes);
app.use("/api/health", healthRoutes);

// Auth routes must be mounted before catch-all protected routes
app.use("/api/auth", authRoutes);
app.use("/", authRoutes);

app.use("/api", dailyLogRoutes);
app.use("/", dailyLogRoutes);
app.use("/api", depressionRiskRoutes);
app.use("/api", moodEngineRoutes);
app.use("/api", stressEngineRoutes);
app.use("/api", appDataRoutes);
app.use("/api", profileRoutes);
app.use("/", depressionRiskRoutes);
app.use("/", moodEngineRoutes);
app.use("/", stressEngineRoutes);
app.use("/", profileRoutes);
app.use("/api", goalRoutes);
app.use("/api", reflectionRoutes);
app.use("/api", plannerRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
