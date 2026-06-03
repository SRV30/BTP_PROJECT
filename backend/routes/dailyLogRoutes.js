const express = require("express");
const {
  createLog,
  getLogs,
  getLatestLog,
  getLogsByDate,
  updateLog,
  deleteLog,
  getHistory,
  getCalendar,
  getStats,
} = require("../controllers/dailyLogController");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/logs", createLog);

router.get("/logs", getLogs);

router.get("/logs/latest", getLatestLog);

router.get("/logs/date/:date", getLogsByDate);

router.put("/logs/:id", updateLog);

router.delete("/logs/:id", deleteLog);

router.get("/logs/history", getHistory);

router.get("/logs/calendar", getCalendar);

router.get("/logs/stats", getStats);

module.exports = router;
