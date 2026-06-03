const AgentMemory = require("../models/AgentMemory");

const Goal = require("../models/Goal");

const AgentTask = require("../models/AgentTask");

const Reflection = require("../models/Reflection");

const WeeklyReport = require("../models/WeeklyReport");

const AgentInsight = require("../models/AgentInsight");

const getAgentDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [memories, goals, tasks, reflections, reports, insights] =
      await Promise.all([
        AgentMemory.find({
          userId,
        }).limit(10),

        Goal.find({
          userId,
        }),

        AgentTask.find({
          userId,
        }),

        Reflection.find({
          userId,
        }).limit(5),

        WeeklyReport.find({
          userId,
        }).limit(5),

        AgentInsight.find({
          userId,
        }).limit(10),
      ]);

    res.json({
      memories,
      goals,
      tasks,
      reflections,
      reports,
      insights,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAgentDashboard,
};
