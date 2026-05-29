const DailyMetrics = require('../models/DailyMetrics')

const TREND_WINDOW_DAYS = 7

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const toNumber = (value, fallback = 0) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const average = (values) => {
  if (values.length === 0) {
    return 0
  }

  return values.reduce((total, value) => total + toNumber(value), 0) / values.length
}

const round = (value, decimals = 1) => Number(value.toFixed(decimals))

const normalizeDate = (value = new Date()) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  date.setUTCHours(0, 0, 0, 0)
  return date
}

const getRiskLabel = (riskScore) => {
  if (riskScore >= 70) {
    return 'High Risk'
  }

  if (riskScore >= 40) {
    return 'Moderate Risk'
  }

  return 'Low Risk'
}

const getRiskLevel = (riskLabel) => riskLabel.replace(' Risk', '')

const splitTrend = (metrics, field) => {
  if (metrics.length < 2) {
    return 0
  }

  const midpoint = Math.ceil(metrics.length / 2)
  const earlyAverage = average(metrics.slice(0, midpoint).map((metric) => metric[field]))
  const recentAverage = average(metrics.slice(midpoint).map((metric) => metric[field]))
  return recentAverage - earlyAverage
}

const scoreFactor = ({ value, moderateThreshold, highThreshold, higherIsRisk = true, moderateWeight, highWeight }) => {
  if (higherIsRisk) {
    if (value >= highThreshold) return highWeight
    if (value >= moderateThreshold) return moderateWeight
    return 0
  }

  if (value <= highThreshold) return highWeight
  if (value <= moderateThreshold) return moderateWeight
  return 0
}

const buildIndicators = ({ averages, trends }) => {
  const positiveIndicators = []
  const riskIndicators = []

  if (averages.sleepHours >= 7) positiveIndicators.push('Consistent healthy sleep duration')
  if (averages.steps >= 6000) positiveIndicators.push('Active lifestyle over the last 7 days')
  if (averages.screenTime <= 5) positiveIndicators.push('Controlled screen time')
  if (averages.moodScore >= 70) positiveIndicators.push('Positive mood history')
  if (trends.moodScore >= 0) positiveIndicators.push('Stable or improving mood trend')

  if (averages.sleepHours < 6) riskIndicators.push('Reduced average sleep over 7 days')
  if (averages.steps < 4000) riskIndicators.push('Low activity levels')
  if (averages.screenTime > 6) riskIndicators.push('Elevated screen time')
  if (averages.moodScore < 60) riskIndicators.push('Lower mood history')
  if (trends.moodScore < -5) riskIndicators.push('Mood trend declined this week')
  if (trends.sleepHours < -0.5) riskIndicators.push('Sleep trend declined this week')
  if (trends.screenTime > 0.75) riskIndicators.push('Screen time increased this week')

  return { positiveIndicators, riskIndicators }
}

const analyzeDepressionRisk = (dailyMetrics = []) => {
  const metrics = [...dailyMetrics]
    .filter((metric) => metric)
    .sort((first, second) => new Date(first.date) - new Date(second.date))
    .slice(-TREND_WINDOW_DAYS)

  const averages = {
    sleepHours: round(average(metrics.map((metric) => metric.sleepHours))),
    steps: Math.round(average(metrics.map((metric) => metric.steps))),
    screenTime: round(average(metrics.map((metric) => metric.screenTime))),
    moodScore: Math.round(average(metrics.map((metric) => metric.moodScore))),
  }
  const trends = {
    sleepHours: round(splitTrend(metrics, 'sleepHours')),
    steps: Math.round(splitTrend(metrics, 'steps')),
    screenTime: round(splitTrend(metrics, 'screenTime')),
    moodScore: Math.round(splitTrend(metrics, 'moodScore')),
  }
  const riskScore = Math.round(
    clamp(
      15 +
        scoreFactor({
          value: averages.sleepHours,
          moderateThreshold: 6,
          highThreshold: 5,
          higherIsRisk: false,
          moderateWeight: 12,
          highWeight: 24,
        }) +
        scoreFactor({
          value: averages.screenTime,
          moderateThreshold: 6,
          highThreshold: 8,
          moderateWeight: 12,
          highWeight: 22,
        }) +
        scoreFactor({
          value: averages.steps,
          moderateThreshold: 4000,
          highThreshold: 2500,
          higherIsRisk: false,
          moderateWeight: 12,
          highWeight: 22,
        }) +
        scoreFactor({
          value: averages.moodScore,
          moderateThreshold: 60,
          highThreshold: 45,
          higherIsRisk: false,
          moderateWeight: 18,
          highWeight: 30,
        }) +
        (trends.moodScore < -5 ? 10 : 0) +
        (trends.sleepHours < -0.5 ? 6 : 0) +
        (trends.screenTime > 0.75 ? 6 : 0),
      0,
      100,
    ),
  )
  const riskLabel = getRiskLabel(riskScore)
  const indicators = buildIndicators({ averages, trends })

  return {
    riskScore,
    riskLabel,
    riskLevel: getRiskLevel(riskLabel),
    analyzedDays: metrics.length,
    averages,
    trends,
    ...indicators,
    disclaimer: 'This is not a medical diagnosis. It is a wellness trend indicator based only on tracked app data.',
  }
}

const getDepressionRiskForUser = async ({ userId, endDate = new Date() }) => {
  if (!userId) {
    throw new Error('userId is required to analyze depression risk')
  }

  const normalizedEndDate = normalizeDate(endDate)
  if (!normalizedEndDate) {
    throw new Error('A valid endDate is required to analyze depression risk')
  }

  const startDate = new Date(normalizedEndDate)
  startDate.setUTCDate(startDate.getUTCDate() - (TREND_WINDOW_DAYS - 1))

  const metrics = await DailyMetrics.find({
    userId,
    date: {
      $gte: startDate,
      $lte: normalizedEndDate,
    },
  }).sort({ date: 1 })
  const analysis = analyzeDepressionRisk(metrics)

  if (metrics.length > 0) {
    await DailyMetrics.findByIdAndUpdate(metrics[metrics.length - 1]._id, {
      depressionRisk: analysis.riskLevel,
    })
  }

  return { analysis, metrics }
}

module.exports = {
  analyzeDepressionRisk,
  getDepressionRiskForUser,
  getRiskLabel,
}
