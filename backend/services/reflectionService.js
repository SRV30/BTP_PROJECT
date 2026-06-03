const Reflection = require("../models/Reflection");

const Goal = require("../models/Goal");

const DailyMetrics = require("../models/DailyMetrics");

const generateWeeklyReflection = async (userId) => {
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

  const strengths = [];
  const weaknesses = [];
  const recommendations = [];

  const avgMood =
    metrics.reduce((sum, m) => sum + (m.moodScore || 0), 0) /
    Math.max(metrics.length, 1);

  const avgSleep =
    metrics.reduce((sum, m) => sum + (m.sleepHours || 0), 0) /
    Math.max(metrics.length, 1);

  if (avgMood >= 70) strengths.push("Mood remained positive");

  if (avgSleep >= 7) strengths.push("Healthy sleep pattern");

  if (avgSleep < 6) weaknesses.push("Sleep duration too low");

  if (avgMood < 50) weaknesses.push("Mood trend needs attention");

  goals.forEach((goal) => {
    if (goal.status === "ACTIVE") {
      recommendations.push(`Continue working on ${goal.title}`);
    }
  });

  return Reflection.create({
    userId,

    weekStart: startDate,

    weekEnd: endDate,

    summary: "Weekly wellness reflection generated.",

    strengths,

    weaknesses,

    recommendations,
  });
};

module.exports = {
  generateWeeklyReflection,
};
