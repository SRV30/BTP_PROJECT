const express = require("express");

const {
  generateTasks,
  getTasks,
  updateTask,
} = require("../controllers/plannerController");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/planner/generate", generateTasks);

router.get("/planner/tasks", getTasks);

router.put("/planner/tasks/:id", updateTask);

module.exports = router;
