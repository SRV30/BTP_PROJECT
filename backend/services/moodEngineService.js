const DailyMetrics = require('../models/DailyMetrics')

const APP_USAGE_FIELDS = ['instagram', 'whatsapp', 'linkedin', 'gmail', 'unacademy']

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const toNumber = (value, fallback = 0) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const normalizeAppUsage = (appUsage = {}) =>
  APP_USAGE_FIELDS.reduce((usage, field) => {
    usage[field] = toNumber(appUsage[field], 0)
    return usage
  }, {})

const getMoodLabel = (moodScore) => {
  if (moodScore >= 70) {
    return 'Happy'
  }

  if (moodScore >= 45) {
    return 'Neutral'
  }

  return 'Sad'
}

const calculateStressScore = ({ sleep, steps, screenTime, appUsage = {} }) => {
  const socialUsage = toNumber(appUsage.instagram) + toNumber(appUsage.whatsapp)
  const productivityUsage = toNumber(appUsage.linkedin) + toNumber(appUsage.gmail) + toNumber(appUsage.unacademy)
  const sleepPenalty = clamp((7 - sleep) * 9, -12, 32)
  const inactivityPenalty = clamp((6000 - steps) / 200, -10, 28)
  const screenPenalty = clamp((screenTime - 4) * 7, -8, 32)
  const socialPenalty = clamp(socialUsage / 18, 0, 18)
  const productivityOffset = clamp(productivityUsage / 35, 0, 8)

  return Math.round(clamp(38 + sleepPenalty + inactivityPenalty + screenPenalty + socialPenalty - productivityOffset, 0, 100))
}

const calculateMood = ({ sleep, steps, screenTime, appUsage = {} }) => {
  const normalizedSleep = toNumber(sleep)
  const normalizedSteps = toNumber(steps)
  const normalizedScreenTime = toNumber(screenTime)
  const normalizedAppUsage = normalizeAppUsage(appUsage)
  const stressScore = calculateStressScore({
    sleep: normalizedSleep,
    steps: normalizedSteps,
    screenTime: normalizedScreenTime,
    appUsage: normalizedAppUsage,
  })
  const socialUsage = normalizedAppUsage.instagram + normalizedAppUsage.whatsapp
  const wellnessBoost = clamp((normalizedSleep - 6) * 8, -18, 18) + clamp(normalizedSteps / 550, 0, 20)
  const screenPenalty = clamp((normalizedScreenTime - 4) * 5, 0, 20)
  const socialPenalty = clamp(socialUsage / 20, 0, 15)
  const stressPenalty = stressScore * 0.2
  const moodScore = Math.round(clamp(68 + wellnessBoost - screenPenalty - socialPenalty - stressPenalty, 0, 100))

  return {
    moodScore,
    moodLabel: getMoodLabel(moodScore),
    stressScore,
  }
}

const normalizeDate = (value = new Date()) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  date.setUTCHours(0, 0, 0, 0)
  return date
}

const getDepressionRisk = ({ moodScore, stressScore, sleep }) => {
  if (moodScore < 40 || stressScore >= 75 || sleep < 5) {
    return 'High'
  }

  if (moodScore < 60 || stressScore >= 55 || sleep < 6) {
    return 'Moderate'
  }

  return 'Low'
}

const saveMoodMetrics = async ({ userId, date = new Date(), sleep, sleepHours, steps, screenTime, appUsage = {} }) => {
  const normalizedSleep = toNumber(sleep ?? sleepHours)
  const normalizedSteps = Math.round(toNumber(steps))
  const normalizedScreenTime = toNumber(screenTime)
  const normalizedAppUsage = normalizeAppUsage(appUsage)
  const metricDate = normalizeDate(date)

  if (!userId) {
    throw new Error('userId is required to store mood metrics')
  }

  if (!metricDate) {
    throw new Error('A valid date is required to store mood metrics')
  }

  const mood = calculateMood({
    sleep: normalizedSleep,
    steps: normalizedSteps,
    screenTime: normalizedScreenTime,
    appUsage: normalizedAppUsage,
  })

  const payload = {
    userId,
    date: metricDate,
    sleepHours: normalizedSleep,
    steps: normalizedSteps,
    screenTime: normalizedScreenTime,
    ...normalizedAppUsage,
    moodScore: mood.moodScore,
    moodLabel: mood.moodLabel,
    stressScore: mood.stressScore,
    depressionRisk: getDepressionRisk({
      moodScore: mood.moodScore,
      stressScore: mood.stressScore,
      sleep: normalizedSleep,
    }),
    tomorrowPrediction: {
      moodLabel: getMoodLabel(clamp(mood.moodScore + 2, 0, 100)),
      moodScore: clamp(mood.moodScore + 2, 0, 100),
      confidence: 82,
      stressScore: clamp(mood.stressScore - 3, 0, 100),
    },
  }

  const metrics = await DailyMetrics.findOneAndUpdate(
    { userId, date: metricDate },
    { $set: payload },
    {
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      upsert: true,
    },
  )

  return { metrics, mood }
}

module.exports = {
  calculateMood,
  calculateStressScore,
  getMoodLabel,
  saveMoodMetrics,
}
