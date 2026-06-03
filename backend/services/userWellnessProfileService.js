const DailyMetrics = require("../models/DailyMetrics");

const buildWellnessProfile = async (userId) => {
  const metrics = await DailyMetrics.find({ userId })
    .sort({ date: -1 })
    .limit(30);

  if (!metrics.length) return null;

  const avgSleep =
    metrics.reduce((s, m) => s + (m.sleepHours || 0), 0) / metrics.length;

  const avgSteps =
    metrics.reduce((s, m) => s + (m.steps || 0), 0) / metrics.length;

  const avgScreenTime =
    metrics.reduce((s, m) => s + (m.screenTime || 0), 0) / metrics.length;

  return {
    sleepPattern: avgSleep >= 7 ? "Good" : "Poor",

    activityPattern: avgSteps >= 6000 ? "Active" : "Moderate",

    screenTimePattern: avgScreenTime <= 5 ? "Healthy" : "High",
  };
};

module.exports = {
  buildWellnessProfile,
};
