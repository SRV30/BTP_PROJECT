const axios = require('axios')
const { env } = require('../utils/env')
const { getCurrentTimeSlot } = require('../utils/timeSlot')

const MIN_WEEKLY_DAYS = 7
const MOOD_LABELS = new Set(['Happy', 'Neutral', 'Sad'])

const toNumber = (value, fallback = 0) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const average = (values) => {
  if (values.length === 0) {
    return 0
  }

  return values.reduce((total, value) => total + toNumber(value), 0) / values.length
}

const round = (value, decimals = 1) => Number(value.toFixed(decimals))

const normalizeMoodLabel = (label, score = 50) => {
  if (MOOD_LABELS.has(label)) {
    return label
  }

  if (score >= 70) {
    return 'Happy'
  }

  if (score < 45) {
    return 'Sad'
  }

  return 'Neutral'
}

const getStressLevel = (stressScore) => {
  if (stressScore >= 70) {
    return 'High'
  }

  if (stressScore >= 40) {
    return 'Moderate'
  }

  return 'Low'
}

const transformDepressionRisk = (depressionRisk = 'Low') => {
  const risk = String(depressionRisk || 'Low').trim().toLowerCase()

  if (risk.includes('high')) {
    return 'High Risk'
  }

  if (risk.includes('moderate')) {
    return 'Moderate Risk'
  }

  return 'Low Risk'
}

const getWeeklyTrend = (weeklyMetrics) => {
  if (weeklyMetrics.length < 2) {
    return 'Stable'
  }

  const midpoint = Math.ceil(weeklyMetrics.length / 2)
  const earlierAverage = average(weeklyMetrics.slice(0, midpoint).map((metric) => metric.moodScore))
  const recentAverage = average(weeklyMetrics.slice(midpoint).map((metric) => metric.moodScore))
  const difference = recentAverage - earlierAverage

  if (difference > 3) {
    return 'Improving'
  }

  if (difference < -3) {
    return 'Declining'
  }

  return 'Stable'
}

const sortMetrics = (metrics = []) => [...metrics].filter(Boolean).sort((first, second) => new Date(first.date) - new Date(second.date))

const padWeeklyMetrics = (metrics) => {
  const weeklyMetrics = sortMetrics(metrics).slice(-MIN_WEEKLY_DAYS)

  if (weeklyMetrics.length === 0) {
    return []
  }

  const [firstMetric] = weeklyMetrics
  while (weeklyMetrics.length < MIN_WEEKLY_DAYS) {
    weeklyMetrics.unshift(firstMetric)
  }

  return weeklyMetrics
}

const buildWeeklyMoodStatistics = (metrics) => {
  const weeklyMetrics = padWeeklyMetrics(metrics)
  const labelCounts = weeklyMetrics.reduce(
    (counts, metric) => {
      const moodLabel = normalizeMoodLabel(metric.moodLabel, metric.moodScore)
      return { ...counts, [moodLabel]: counts[moodLabel] + 1 }
    },
    { Happy: 0, Neutral: 0, Sad: 0 },
  )

  return {
    weeklyMetrics,
    weeklyTrend: getWeeklyTrend(weeklyMetrics),
    happyDays: labelCounts.Happy,
    neutralDays: labelCounts.Neutral,
    sadDays: labelCounts.Sad,
    weeklyMoodScores: weeklyMetrics.map((metric) => Math.round(clamp(toNumber(metric.moodScore), 0, 100))),
  }
}

const buildFastApiPayload = ({ metrics, user, now = new Date() }) => {
  const sortedMetrics = sortMetrics(metrics)
  if (sortedMetrics.length === 0) {
    throw new Error('At least one DailyMetrics record is required to build an AI analysis payload')
  }

  const latest = sortedMetrics[sortedMetrics.length - 1]
  const weeklyStats = buildWeeklyMoodStatistics(sortedMetrics)
  const prediction = latest.tomorrowPrediction || {}
  const currentMoodLabel = normalizeMoodLabel(latest.moodLabel, latest.moodScore)

  return {
    userId: String(user?._id || user?.id || latest.userId || ''),
    userName: user?.name || 'MoodSense User',
    currentDate: new Date(latest.date || now).toISOString().slice(0, 10),
    currentTimeSlot: getCurrentTimeSlot(now),
    averageSleep: round(average(weeklyStats.weeklyMetrics.map((metric) => metric.sleepHours))),
    averageSteps: Math.round(average(weeklyStats.weeklyMetrics.map((metric) => metric.steps))),
    averageScreenTime: round(average(weeklyStats.weeklyMetrics.map((metric) => metric.screenTime))),
    instagramUsage: Math.round(clamp(toNumber(latest.instagram), 0, 1440)),
    whatsappUsage: Math.round(clamp(toNumber(latest.whatsapp), 0, 1440)),
    linkedinUsage: Math.round(clamp(toNumber(latest.linkedin), 0, 1440)),
    gmailUsage: Math.round(clamp(toNumber(latest.gmail), 0, 1440)),
    udemyUsage: Math.round(clamp(toNumber(latest.udemy), 0, 1440)),
    moodScore: Math.round(clamp(toNumber(latest.moodScore), 0, 100)),
    moodLabel: currentMoodLabel,
    stressScore: Math.round(clamp(toNumber(latest.stressScore), 0, 100)),
    stressLevel: getStressLevel(toNumber(latest.stressScore)),
    depressionRisk: transformDepressionRisk(latest.depressionRisk),
    tomorrowMood: normalizeMoodLabel(prediction.moodLabel || currentMoodLabel, prediction.moodScore || latest.moodScore),
    tomorrowConfidence: Math.round(clamp(toNumber(prediction.confidence, 70), 0, 100)),
    weeklyTrend: weeklyStats.weeklyTrend,
    happyDays: weeklyStats.happyDays,
    neutralDays: weeklyStats.neutralDays,
    sadDays: weeklyStats.sadDays,
    weeklyMoodScores: weeklyStats.weeklyMoodScores,
  }
}

const createUnavailableResponse = (message, details = {}) => ({
  success: false,
  data: null,
  error: {
    message,
    ...details,
  },
})

const analyzeDailyMetrics = async ({ metrics, user, now = new Date() }) => {
  const payload = buildFastApiPayload({ metrics, user, now })

  if (!env.AI_SERVICE_URL) {
    return {
      ...createUnavailableResponse('AI service URL is not configured', { code: 'AI_SERVICE_NOT_CONFIGURED' }),
      payload,
    }
  }

  try {
    const response = await axios.post(`${env.AI_SERVICE_URL.replace(/\/$/, '')}/analyze`, payload, {
      timeout: env.AI_SERVICE_TIMEOUT_MS,
      headers: { 'Content-Type': 'application/json' },
    })

    return {
      success: Boolean(response.data?.success),
      data: response.data?.data || null,
      error: null,
      payload,
    }
  } catch (error) {
    const isTimeout = error.code === 'ECONNABORTED'
    const statusCode = error.response?.status
    const serviceMessage = error.response?.data?.message || error.message || 'AI service request failed'

    return {
      ...createUnavailableResponse(isTimeout ? 'AI service request timed out' : 'AI service request failed', {
        code: isTimeout ? 'AI_SERVICE_TIMEOUT' : 'AI_SERVICE_FAILURE',
        statusCode,
        serviceMessage,
      }),
      payload,
    }
  }
}

module.exports = {
  analyzeDailyMetrics,
  buildFastApiPayload,
  buildWeeklyMoodStatistics,
  getStressLevel,
  transformDepressionRisk,
}
