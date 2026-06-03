const AgentInsight = require("../models/AgentInsight");

const generateInsights = async ({ userId, metrics }) => {
  const insights = [];

  if (metrics.sleepHours < 6) {
    insights.push({
      userId,

      type: "WARNING",

      title: "Low Sleep",

      content: "Sleep duration is below recommended level.",

      confidence: 90,
    });
  }

  if (metrics.moodScore > 75) {
    insights.push({
      userId,

      type: "SUCCESS",

      title: "Positive Mood",

      content: "Mood score remains strong.",

      confidence: 88,
    });
  }

  if (!insights.length) return [];

  return AgentInsight.insertMany(insights);
};

module.exports = {
  generateInsights,
};
