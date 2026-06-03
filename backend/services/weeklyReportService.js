const Goal = require("../models/Goal");

const DailyMetrics = require("../models/DailyMetrics");

const WeeklyReport = require("../models/WeeklyReport");

const generateWeeklyReport = async (userId) => {
  const endDate = new Date();

  const startDate = new Date();

  startDate.setDate(startDate.getDate() - 7);

  const metrics = await DailyMetrics.find({
    userId,

    date: {
      $gte: startDate,

      $lte: endDate,
    },
  });

  const goals = await Goal.find({
    userId,
  });

  const moodAverage =
    metrics.reduce((sum, metric) => sum + (metric.moodScore || 0), 0) /
    Math.max(metrics.length, 1);

  const stressAverage =
    metrics.reduce((sum, metric) => sum + (metric.stressScore || 0), 0) /
    Math.max(metrics.length, 1);

  return WeeklyReport.create({
    userId,

    weekStart: startDate,

    weekEnd: endDate,

    summary: "Weekly wellness report generated.",

    moodAverage,

    stressAverage,

    completedGoals: goals.filter((goal) => goal.status === "COMPLETED").length,

    pendingGoals: goals.filter((goal) => goal.status === "ACTIVE").length,
  });
};

module.exports = {
  generateWeeklyReport,
};
