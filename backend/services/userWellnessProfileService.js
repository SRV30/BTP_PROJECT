const DailyMetrics = require("../models/DailyMetrics");

const calculateWellnessPatterns = (metrics = []) => {
  const filteredMetrics = metrics.filter(Boolean)
  if (!filteredMetrics.length) return null

  const recentData = filteredMetrics
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 30)

  const daysAnalyzed = recentData.length
  const avgSleep = recentData.reduce((s, m) => s + (m.sleepHours || 0), 0) / daysAnalyzed
  const avgSteps = recentData.reduce((s, m) => s + (m.steps || 0), 0) / daysAnalyzed
  const avgScreenTime = recentData.reduce((s, m) => s + (m.screenTime || 0), 0) / daysAnalyzed

  return {
    sleepPattern: avgSleep >= 7 ? 'Good' : 'Poor',
    activityPattern: avgSteps >= 6000 ? 'Active' : 'Moderate',
    screenTimePattern: avgScreenTime <= 5 ? 'Healthy' : 'High',
    daysAnalyzed,
  }
}

const buildWellnessProfile = async (userId) => {
  const metrics = await DailyMetrics.find({ userId }).sort({ date: -1 }).limit(30).lean()
  return calculateWellnessPatterns(metrics)
}

module.exports = {
  buildWellnessProfile,
  calculateWellnessPatterns,
}
