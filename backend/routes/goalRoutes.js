const express = require("express");

const {
  createGoal,
  getGoals,
  getActiveGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/goals", createGoal);

router.get("/goals", getGoals);

router.get("/goals/active", getActiveGoals);

router.put("/goals/:id", updateGoal);

router.delete("/goals/:id", deleteGoal);

module.exports = router;
