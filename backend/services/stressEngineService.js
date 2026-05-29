const DailyMetrics = require('../models/DailyMetrics')

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const toNumber = (value, fallback = 0) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const normalizeDate = (value = new Date()) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  date.setUTCHours(0, 0, 0, 0)
  return date
}

const getStressLabel = (stressScore) => {
  if (stressScore >= 70) {
    return 'High'
  }

  if (stressScore >= 40) {
    return 'Moderate'
  }

  return 'Low'
}

const calculateStress = ({ sleep, steps, screenTime, instagram }) => {
  const normalizedSleep = toNumber(sleep)
  const normalizedSteps = toNumber(steps)
  const normalizedScreenTime = toNumber(screenTime)
  const normalizedInstagram = toNumber(instagram)
  const factors = {
    sleep: Math.round(clamp((7 - normalizedSleep) * 10, -12, 32)),
    steps: Math.round(clamp((6000 - normalizedSteps) / 200, -10, 28)),
    screenTime: Math.round(clamp((normalizedScreenTime - 4) * 8, -8, 34)),
    instagram: Math.round(clamp(normalizedInstagram / 12, 0, 20)),
  }
  const stressScore = Math.round(
    clamp(36 + factors.sleep + factors.steps + factors.screenTime + factors.instagram, 0, 100),
  )

  return {
    stressScore,
    stressLabel: getStressLabel(stressScore),
    factors,
  }
}

const saveStressMetrics = async ({ userId, date = new Date(), sleep, sleepHours, steps, screenTime, instagram }) => {
  const metricDate = normalizeDate(date)

  if (!userId) {
    throw new Error('userId is required to store stress metrics')
  }

  if (!metricDate) {
    throw new Error('A valid date is required to store stress metrics')
  }

  const stress = calculateStress({
    sleep: sleep ?? sleepHours,
    steps,
    screenTime,
    instagram,
  })

  const metrics = await DailyMetrics.findOneAndUpdate(
    { userId, date: metricDate },
    {
      $set: {
        sleepHours: toNumber(sleep ?? sleepHours),
        steps: Math.round(toNumber(steps)),
        screenTime: toNumber(screenTime),
        instagram: toNumber(instagram),
        stressScore: stress.stressScore,
      },
    },
    { new: true, runValidators: true },
  )

  return { metrics, stress }
}

module.exports = {
  calculateStress,
  getStressLabel,
  saveStressMetrics,
}
