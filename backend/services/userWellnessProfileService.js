const DailyMetrics = require("../models/DailyMetrics");

const calculateWellnessPatterns = (metrics = []) => {
  if (!metrics.length) return null

  const recent30 = metrics
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 30)

  const avgSleep = recent30.reduce((s, m) => s + (m.sleepHours || 0), 0) / recent30.length
  const avgSteps = recent30.reduce((s, m) => s + (m.steps || 0), 0) / recent30.length
  const avgScreenTime = recent30.reduce((s, m) => s + (m.screenTime || 0), 0) / recent30.length

  return {
    sleepPattern: avgSleep >= 7 ? 'Good' : 'Poor',
    activityPattern: avgSteps >= 6000 ? 'Active' : 'Moderate',
    screenTimePattern: avgScreenTime <= 5 ? 'Healthy' : 'High',
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
