const AgentReports = require('../models/AgentReports')
const DailyMetrics = require('../models/DailyMetrics')

const dayName = (date) => new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(date))

const defaultMetrics = [
  { date: '2026-05-24', sleepHours: 7.2, steps: 5100, screenTime: 4.4, moodScore: 72, moodLabel: 'Happy', stressScore: 45, instagram: 160, whatsapp: 45, linkedin: 35, gmail: 20, unacademy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 75, confidence: 80, stressScore: 42 } },
  { date: '2026-05-25', sleepHours: 7.0, steps: 5400, screenTime: 4.2, moodScore: 75, moodLabel: 'Happy', stressScore: 43, instagram: 155, whatsapp: 40, linkedin: 45, gmail: 25, unacademy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 76, confidence: 81, stressScore: 41 } },
  { date: '2026-05-26', sleepHours: 6.5, steps: 4100, screenTime: 5.1, moodScore: 68, moodLabel: 'Neutral', stressScore: 51, instagram: 190, whatsapp: 55, linkedin: 25, gmail: 20, unacademy: 0, depressionRisk: 'Moderate', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 72, confidence: 76, stressScore: 47 } },
  { date: '2026-05-27', sleepHours: 7.4, steps: 6000, screenTime: 4.1, moodScore: 79, moodLabel: 'Happy', stressScore: 40, instagram: 145, whatsapp: 42, linkedin: 50, gmail: 22, unacademy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 80, confidence: 83, stressScore: 39 } },
  { date: '2026-05-28', sleepHours: 7.6, steps: 6800, screenTime: 3.9, moodScore: 82, moodLabel: 'Happy', stressScore: 38, instagram: 130, whatsapp: 35, linkedin: 55, gmail: 28, unacademy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 83, confidence: 84, stressScore: 36 } },
  { date: '2026-05-29', sleepHours: 7.1, steps: 5900, screenTime: 4.3, moodScore: 80, moodLabel: 'Happy', stressScore: 42, instagram: 150, whatsapp: 44, linkedin: 40, gmail: 20, unacademy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 82, confidence: 82, stressScore: 39 } },
  { date: '2026-05-30', sleepHours: 7.1, steps: 4850, screenTime: 4.5, moodScore: 84, moodLabel: 'Happy', stressScore: 42, instagram: 180, whatsapp: 45, linkedin: 40, gmail: 20, unacademy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 86, confidence: 82, stressScore: 39 } },
]

const getMetrics = async (userId) => {
  const metrics = await DailyMetrics.find({ userId }).sort({ date: 1 }).limit(30).lean()
  return metrics.length > 0 ? metrics : defaultMetrics
}

const getLatest = (metrics) => metrics[metrics.length - 1]

const average = (metrics, field) => Math.round(metrics.reduce((total, metric) => total + Number(metric[field] || 0), 0) / metrics.length)

const toDailyData = (metrics) => metrics.slice(-7).map((metric) => ({
  day: dayName(metric.date),
  mood: metric.moodScore,
  sleep: Number(metric.sleepHours || 0),
  steps: metric.steps,
  screenTime: Number(metric.screenTime || 0),
  stress: metric.stressScore,
}))

const emotionDistribution = (metrics) => {
  const counts = metrics.slice(-7).reduce((result, metric) => ({ ...result, [metric.moodLabel]: (result[metric.moodLabel] || 0) + 1 }), {})
  const total = metrics.slice(-7).length || 1
  return [
    { name: 'Happy', value: Math.round(((counts.Happy || 0) / total) * 100), color: '#22c55e' },
    { name: 'Neutral', value: Math.round(((counts.Neutral || 0) / total) * 100), color: '#3b82f6' },
    { name: 'Calm', value: 10, color: '#fbbf24' },
    { name: 'Sad', value: Math.round(((counts.Sad || 0) / total) * 100), color: '#fb7185' },
  ]
}

const getDashboard = async (req, res, next) => {
  try {
    const metrics = await getMetrics(req.user._id)
    const latest = getLatest(metrics)
    return res.status(200).json({
      user: req.user.toJSON(),
      today: latest,
      overview: {
        stressLevel: latest.stressScore,
        sleep: latest.sleepHours,
        steps: latest.steps,
        screenTime: latest.screenTime,
      },
      weeklyMoodTrend: toDailyData(metrics),
      emotionDistribution: emotionDistribution(metrics),
      productivityScore: 78,
      aiInsight: 'Your mood score is higher than recent tracked days. Consistent sleep and moderate app usage appear supportive.',
    })
  } catch (error) {
    next(error)
  }
}

const getAnalytics = async (req, res, next) => {
  try {
    const metrics = await getMetrics(req.user._id)
    const dailyData = toDailyData(metrics)
    return res.status(200).json({
      dailyData,
      stats: {
        averageMood: average(metrics, 'moodScore'),
        averageSleep: Number((metrics.reduce((total, metric) => total + Number(metric.sleepHours || 0), 0) / metrics.length).toFixed(1)),
        averageSteps: average(metrics, 'steps'),
        averageScreenTime: Number((metrics.reduce((total, metric) => total + Number(metric.screenTime || 0), 0) / metrics.length).toFixed(1)),
        averageStress: average(metrics, 'stressScore'),
      },
      emotionDistribution: emotionDistribution(metrics),
      summary: 'This week your mood improved while sleep remained stable and stress stayed controlled.',
    })
  } catch (error) {
    next(error)
  }
}

const getPredictions = async (req, res, next) => {
  try {
    const metrics = await getMetrics(req.user._id)
    const latest = getLatest(metrics)
    const prediction = latest.tomorrowPrediction || { moodLabel: 'Happy', moodScore: 86, confidence: 82, stressScore: 39 }
    return res.status(200).json({
      tomorrowMood: prediction.moodLabel,
      tomorrowConfidence: prediction.confidence,
      tomorrowMoodScore: prediction.moodScore,
      tomorrowStressScore: prediction.stressScore,
      moodForecast: toDailyData(metrics).map((metric, index) => ({ day: metric.day, value: Math.min(100, metric.mood + index) })),
      stressForecast: toDailyData(metrics).map((metric, index) => ({ day: metric.day, value: Math.max(0, metric.stress - index) })),
      explanation: 'Based on recent sleep, activity levels, and screen usage, your existing prediction remains positive.',
    })
  } catch (error) {
    next(error)
  }
}

const getAiInsights = async (req, res, next) => {
  try {
    const metrics = await getMetrics(req.user._id)
    const latest = getLatest(metrics)
    const agentReport = await AgentReports.findOne({ userId: req.user._id }).sort({ date: -1 }).lean()
    return res.status(200).json({
      todayInsight: 'Your mood is elevated. You have been more positive than most tracked days.',
      moodAnalysis: { score: latest.moodScore, mood: latest.moodLabel, trend: 'Improving' },
      stressAnalysis: { score: latest.stressScore, level: latest.stressScore >= 70 ? 'High' : latest.stressScore >= 40 ? 'Moderate' : 'Low' },
      depressionRisk: latest.depressionRisk?.endsWith('Risk') ? latest.depressionRisk : `${latest.depressionRisk} Risk`,
      prediction: latest.tomorrowPrediction,
      recommendations: ['Walk 15 minutes', 'Sleep before 11 PM', 'Reduce Instagram by 20 mins'],
      agentReport,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAiInsights, getAnalytics, getDashboard, getPredictions }
