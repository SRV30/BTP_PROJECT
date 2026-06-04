const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const average = (values) => {
  if (values.length === 0) return 0
  return values.reduce((total, value) => total + value, 0) / values.length
}

const getMoodLabel = (moodScore) => {
  if (moodScore >= 70) return 'Happy'
  if (moodScore >= 45) return 'Neutral'
  return 'Sad'
}

/**
 * Calculates tomorrow's prediction based on historical data.
 * @param {Array} metrics - List of DailyMetrics, expected to be sorted by date.
 * @returns {Object} Prediction results
 */
const calculatePrediction = (metrics = []) => {
  if (metrics.length === 0) {
    return {
      moodLabel: 'Neutral',
      moodScore: 50,
      confidence: 50,
      stressScore: 50,
      expectedSleep: 7.0,
      expectedSteps: 5000,
      expectedScreenTime: 4.0,
    }
  }

  // Ensure sorted latest first
  const sorted = [...metrics].sort((a, b) => new Date(b.date) - new Date(a.date))

  const today = sorted[0]
  const last7 = sorted.slice(0, 7)
  const last30 = sorted.slice(0, 30)

  // Weighted Mood Prediction
  const avg7Mood = average(last7.map((m) => m.moodScore))
  const avg30Mood = average(last30.map((m) => m.moodScore))

  // Weights: Today (50%), 7-day average (30%), 30-day average (20%)
  let baseMood = today.moodScore * 0.5 + avg7Mood * 0.3 + avg30Mood * 0.2

  // Trend Adjustment (Last 3 days)
  if (last7.length >= 3) {
    const recentTrend = (sorted[0].moodScore - sorted[2].moodScore) / 2
    baseMood += recentTrend * 1.5 // Adjust mood slightly based on recent momentum
  }

  // Weighted Stress Prediction
  const avg7Stress = average(last7.map((m) => m.stressScore))
  const avg30Stress = average(last30.map((m) => m.stressScore))
  const baseStress = today.stressScore * 0.5 + avg7Stress * 0.3 + avg30Stress * 0.2

  // Confidence Calculation
  // 1. Data consistency (lower variance in mood score increases confidence)
  const moodScores = last7.map((m) => m.moodScore)
  const moodRange = last7.length > 1 ? Math.max(...moodScores) - Math.min(...moodScores) : 20
  const consistencyScore = Math.max(0, 100 - moodRange)

  // 2. Data volume (having at least 14 days of data hits 100% volume score)
  const volumeScore = Math.min(100, (sorted.length / 14) * 100)

  const confidence = Math.round(consistencyScore * 0.6 + volumeScore * 0.4)

  // Behavioral Forecasts (weighted averages)
  const expectedSleep = today.sleepHours * 0.4 + average(last7.map((m) => m.sleepHours)) * 0.6
  const expectedSteps = today.steps * 0.4 + average(last7.map((m) => m.steps)) * 0.6
  const expectedScreenTime = today.screenTime * 0.4 + average(last7.map((m) => m.screenTime)) * 0.6

  const finalMoodScore = Math.round(clamp(baseMood, 0, 100))

  return {
    moodLabel: getMoodLabel(finalMoodScore),
    moodScore: finalMoodScore,
    confidence: clamp(confidence, 20, 95),
    stressScore: Math.round(clamp(baseStress, 0, 100)),
    expectedSleep: Number(expectedSleep.toFixed(1)),
    expectedSteps: Math.round(expectedSteps),
    expectedScreenTime: Number(expectedScreenTime.toFixed(1)),
  }
}

module.exports = {
  calculatePrediction,
}
