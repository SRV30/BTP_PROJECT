const AgentReports = require('../models/AgentReports')
const DailyMetrics = require('../models/DailyMetrics')
const { analyzeDailyMetrics, buildFastApiPayload } = require('../services/aiService')

const dayName = (date) => new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(date))

const defaultMetrics = [
  { date: '2026-05-24', sleepHours: 7.2, steps: 5100, screenTime: 4.4, moodScore: 72, moodLabel: 'Happy', stressScore: 45, instagram: 160, whatsapp: 45, linkedin: 35, gmail: 20, udemy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 75, confidence: 80, stressScore: 42 } },
  { date: '2026-05-25', sleepHours: 7.0, steps: 5400, screenTime: 4.2, moodScore: 75, moodLabel: 'Happy', stressScore: 43, instagram: 155, whatsapp: 40, linkedin: 45, gmail: 25, udemy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 76, confidence: 81, stressScore: 41 } },
  { date: '2026-05-26', sleepHours: 6.5, steps: 4100, screenTime: 5.1, moodScore: 68, moodLabel: 'Neutral', stressScore: 51, instagram: 190, whatsapp: 55, linkedin: 25, gmail: 20, udemy: 0, depressionRisk: 'Moderate', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 72, confidence: 76, stressScore: 47 } },
  { date: '2026-05-27', sleepHours: 7.4, steps: 6000, screenTime: 4.1, moodScore: 79, moodLabel: 'Happy', stressScore: 40, instagram: 145, whatsapp: 42, linkedin: 50, gmail: 22, udemy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 80, confidence: 83, stressScore: 39 } },
  { date: '2026-05-28', sleepHours: 7.6, steps: 6800, screenTime: 3.9, moodScore: 82, moodLabel: 'Happy', stressScore: 38, instagram: 130, whatsapp: 35, linkedin: 55, gmail: 28, udemy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 83, confidence: 84, stressScore: 36 } },
  { date: '2026-05-29', sleepHours: 7.1, steps: 5900, screenTime: 4.3, moodScore: 80, moodLabel: 'Happy', stressScore: 42, instagram: 150, whatsapp: 44, linkedin: 40, gmail: 20, udemy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 82, confidence: 82, stressScore: 39 } },
  { date: '2026-05-30', sleepHours: 7.1, steps: 4850, screenTime: 4.5, moodScore: 84, moodLabel: 'Happy', stressScore: 42, instagram: 180, whatsapp: 45, linkedin: 40, gmail: 20, udemy: 0, depressionRisk: 'Low', tomorrowPrediction: { moodLabel: 'Happy', moodScore: 86, confidence: 82, stressScore: 39 } },
]

const getMetrics = async (userId) => {
  const metrics = await DailyMetrics.find({ userId }).sort({ date: 1 }).limit(30).lean()
  return metrics.length > 0 ? metrics : defaultMetrics
}

const getLatest = (metrics) => metrics[metrics.length - 1]

const normalizeReportDate = (value = new Date()) => {
  const date = new Date(value)
  date.setUTCHours(0, 0, 0, 0)
  return date
}

const toRecommendationLabels = (recommendations = []) => recommendations.map((recommendation) => {
  if (typeof recommendation === 'string') {
    return recommendation
  }

  return recommendation.title || recommendation.description
}).filter(Boolean)

const toAgentReports = (aiData, report = {}) => {
  if (!aiData) {
    return null
  }

  const recommendations = toRecommendationLabels(aiData.recommendations)

  return {
    id: report?._id,
    dailyMetricsId: report?.dailyMetricsId,
    date: report?.date,
    source: report?.source || 'FastAPI',
    behaviorSummary: aiData.behaviorSummary,
    moodAgent: {
      agentName: 'Mood Agent',
      status: 'Generated',
      summary: aiData.moodAnalysis,
      recommendations: [],
      confidence: 0,
    },
    stressAgent: {
      agentName: 'Stress Agent',
      status: 'Generated',
      summary: aiData.stressAnalysis,
      recommendations: [],
      confidence: 0,
    },
    depressionAgent: {
      agentName: 'Depression Agent',
      status: 'Generated',
      summary: aiData.depressionAnalysis,
      recommendations: [],
      confidence: 0,
    },
    predictionAgent: {
      agentName: 'Prediction Agent',
      status: 'Generated',
      summary: aiData.predictionAnalysis,
      recommendations: [],
      confidence: 0,
    },
    wellnessCoachAgent: {
      agentName: 'Wellness Coach Agent',
      status: 'Generated',
      summary: recommendations.join(' • '),
      recommendations,
      confidence: 0,
    },
    overallSummary: aiData.behaviorSummary,
    model: aiData.model,
    generatedAt: aiData.generatedAt,
    cached: aiData.cached,
  }
}

const normalizeRecommendationsForStorage = (recommendations = []) => recommendations.map((recommendation) => {
  if (typeof recommendation === 'string') {
    return { title: recommendation, description: recommendation }
  }

  return {
    title: recommendation.title || recommendation.description || 'Wellness recommendation',
    description: recommendation.description || recommendation.title || 'Review your MoodSense wellness recommendation.',
  }
})

const toWeeklyMoodStatistics = (payload = {}) => ({
  weeklyTrend: payload.weeklyTrend,
  happyDays: payload.happyDays,
  neutralDays: payload.neutralDays,
  sadDays: payload.sadDays,
  weeklyMoodScores: payload.weeklyMoodScores,
})

const buildInsightsResponse = ({ latest, aiData, payload, aiService, report }) => {
  const recommendationLabels = toRecommendationLabels(aiData?.recommendations)

  return {
    todayInsight: aiData?.behaviorSummary || 'Your mood is elevated. You have been more positive than most tracked days.',
    moodAnalysis: {
      score: latest.moodScore,
      mood: latest.moodLabel,
      trend: payload?.weeklyTrend || 'Stable',
      explanation: aiData?.moodAnalysis,
    },
    stressAnalysis: {
      score: latest.stressScore,
      level: latest.stressScore >= 70 ? 'High' : latest.stressScore >= 40 ? 'Moderate' : 'Low',
      explanation: aiData?.stressAnalysis,
    },
    depressionRisk: payload?.depressionRisk || (latest.depressionRisk?.endsWith('Risk') ? latest.depressionRisk : `${latest.depressionRisk} Risk`),
    depressionAnalysis: aiData?.depressionAnalysis,
    prediction: {
      ...latest.tomorrowPrediction,
      explanation: aiData?.predictionAnalysis,
    },
    recommendations: recommendationLabels.length > 0 ? recommendationLabels : ['Walk 15 minutes', 'Sleep before 11 PM', 'Reduce Instagram by 20 mins'],
    weeklyMoodStatistics: toWeeklyMoodStatistics(payload),
    currentTimeSlot: payload?.currentTimeSlot,
    aiService,
    agentReport: toAgentReports(aiData, report),
  }
}

const saveAnalysisReport = async ({ userId, latest, reportDate, aiAnalysis }) => {
  if (!aiAnalysis.success || !aiAnalysis.data) {
    return null
  }

  const update = {
    dailyMetricsId: latest._id,
    requestPayload: aiAnalysis.payload,
    analysis: {
      ...aiAnalysis.data,
      recommendations: normalizeRecommendationsForStorage(aiAnalysis.data.recommendations),
      cached: false,
    },
    fastApiResponse: {
      success: aiAnalysis.success,
      data: aiAnalysis.data,
    },
    source: 'FastAPI',
  }

  return AgentReports.findOneAndUpdate(
    { userId, date: reportDate },
    { $set: update, $setOnInsert: { userId, date: reportDate } },
    { new: true, upsert: true, setDefaultsOnInsert: true, lean: true },
  )
}


const getStoredMetrics = async (userId) => DailyMetrics.find({ userId }).sort({ date: 1 }).limit(30).lean()

const scoreProductivity = (metric = {}) => {
  const stepsScore = Math.min(30, (Number(metric.steps || 0) / 8000) * 30)
  const sleepHours = Number(metric.sleepHours || 0)
  const sleepScore = sleepHours >= 7 && sleepHours <= 9 ? 25 : Math.max(0, 25 - Math.abs(7.5 - sleepHours) * 6)
  const screenScore = Math.max(0, 20 - Math.max(0, Number(metric.screenTime || 0) - 4) * 4)
  const focusMinutes = Number(metric.linkedin || 0) + Number(metric.gmail || 0) + Number(metric.udemy || 0)
  const focusScore = Math.min(25, (focusMinutes / 180) * 25)

  return Math.round(Math.min(100, stepsScore + sleepScore + screenScore + focusScore))
}

const getBestDay = (dailyData, field, direction = 'max') => {
  if (dailyData.length === 0) {
    return null
  }

  return dailyData.reduce((selected, item) => {
    if (direction === 'min') {
      return Number(item[field] || 0) < Number(selected[field] || 0) ? item : selected
    }

    return Number(item[field] || 0) > Number(selected[field] || 0) ? item : selected
  }, dailyData[0])
}

const stressLevelValue = (stressScore) => Math.min(5, Math.max(1, Math.ceil(Number(stressScore || 0) / 20)))

const toStressHeatmap = (metrics) => metrics.slice(-7).map((metric) => {
  const base = stressLevelValue(metric.stressScore)
  return {
    day: dayName(metric.date),
    values: [-1, 0, 0, 1, 1, 0, -1].map((offset) => Math.min(5, Math.max(1, base + offset))),
  }
})

const getProductiveApps = (metrics) => {
  const totals = metrics.reduce(
    (result, metric) => ({
      LinkedIn: result.LinkedIn + Number(metric.linkedin || 0),
      Gmail: result.Gmail + Number(metric.gmail || 0),
      Udemy: result.Udemy + Number(metric.udemy || 0),
    }),
    { LinkedIn: 0, Gmail: 0, Udemy: 0 },
  )

  return Object.entries(totals)
    .filter(([, minutes]) => minutes > 0)
    .sort((first, second) => second[1] - first[1])
    .map(([name]) => name)
}

const buildWeeklySummary = ({ dailyData, stats }) => {
  if (dailyData.length === 0) {
    return ['No analytics data is available yet.']
  }

  const first = dailyData[0]
  const last = dailyData[dailyData.length - 1]
  const moodDifference = Math.round(Number(last.mood || 0) - Number(first.mood || 0))
  const stressDifference = Math.round(Number(last.stress || 0) - Number(first.stress || 0))

  return [
    `Average mood was ${stats.averageMood}/100 across ${dailyData.length} tracked days.`,
    `Average sleep was ${stats.averageSleep}h with ${stats.averageSteps.toLocaleString()} average steps.`,
    `Mood ${moodDifference >= 0 ? 'increased' : 'decreased'} by ${Math.abs(moodDifference)} points while stress ${stressDifference <= 0 ? 'decreased' : 'increased'} by ${Math.abs(stressDifference)} points.`,
  ]
}

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
  const recentMetrics = metrics.slice(-7)
  if (recentMetrics.length === 0) {
    return []
  }

  const colors = {
    Happy: '#22c55e',
    Neutral: '#3b82f6',
    Calm: '#fbbf24',
    Sad: '#fb7185',
  }
  const counts = recentMetrics.reduce((result, metric) => ({ ...result, [metric.moodLabel]: (result[metric.moodLabel] || 0) + 1 }), {})
  return Object.entries(counts).map(([name, count]) => ({
    name,
    value: Math.round((count / recentMetrics.length) * 100),
    color: colors[name] || '#94a3b8',
  }))
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
    const metrics = await getStoredMetrics(req.user._id)
    const dailyData = toDailyData(metrics).map((item, index) => ({
      ...item,
      productivity: scoreProductivity(metrics.slice(-7)[index]),
    }))
    const stats = metrics.length > 0
      ? {
          averageMood: average(metrics, 'moodScore'),
          averageSleep: Number((metrics.reduce((total, metric) => total + Number(metric.sleepHours || 0), 0) / metrics.length).toFixed(1)),
          averageSteps: average(metrics, 'steps'),
          averageScreenTime: Number((metrics.reduce((total, metric) => total + Number(metric.screenTime || 0), 0) / metrics.length).toFixed(1)),
          averageStress: average(metrics, 'stressScore'),
        }
      : {
          averageMood: 0,
          averageSleep: 0,
          averageSteps: 0,
          averageScreenTime: 0,
          averageStress: 0,
        }
    const productivityScore = dailyData.length > 0 ? Math.round(dailyData.reduce((total, item) => total + item.productivity, 0) / dailyData.length) : 0
    const mostProductiveDay = getBestDay(dailyData, 'productivity')

    return res.status(200).json({
      dailyData,
      stats,
      emotionDistribution: emotionDistribution(metrics),
      stressHeatmap: toStressHeatmap(metrics),
      weeklySummary: buildWeeklySummary({ dailyData, stats }),
      productivityScore,
      mostProductiveDay: mostProductiveDay?.day || null,
      productiveApps: getProductiveApps(metrics),
      summaryCards: {
        mood: {
          average: stats.averageMood,
          bestDay: getBestDay(dailyData, 'mood')?.day || null,
          bestValue: getBestDay(dailyData, 'mood')?.mood || null,
          worstDay: getBestDay(dailyData, 'mood', 'min')?.day || null,
          worstValue: getBestDay(dailyData, 'mood', 'min')?.mood || null,
        },
        sleep: {
          average: stats.averageSleep,
          bestDay: getBestDay(dailyData, 'sleep')?.day || null,
          bestValue: getBestDay(dailyData, 'sleep')?.sleep || null,
        },
        steps: {
          average: stats.averageSteps,
          mostActiveDay: getBestDay(dailyData, 'steps')?.day || null,
          mostActiveValue: getBestDay(dailyData, 'steps')?.steps || null,
          leastActiveDay: getBestDay(dailyData, 'steps', 'min')?.day || null,
          leastActiveValue: getBestDay(dailyData, 'steps', 'min')?.steps || null,
        },
        screenTime: {
          average: stats.averageScreenTime,
          highestUsageDay: getBestDay(dailyData, 'screenTime')?.day || null,
          highestUsageValue: getBestDay(dailyData, 'screenTime')?.screenTime || null,
          lowestUsageDay: getBestDay(dailyData, 'screenTime', 'min')?.day || null,
          lowestUsageValue: getBestDay(dailyData, 'screenTime', 'min')?.screenTime || null,
        },
        stress: {
          average: stats.averageStress,
          highestStressDay: getBestDay(dailyData, 'stress')?.day || null,
          highestStressValue: getBestDay(dailyData, 'stress')?.stress || null,
          lowestStressDay: getBestDay(dailyData, 'stress', 'min')?.day || null,
          lowestStressValue: getBestDay(dailyData, 'stress', 'min')?.stress || null,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}


const getImprovementSuggestions = (metric = {}) => {
  const suggestions = []

  if (Number(metric.steps || 0) < 7000) suggestions.push('Increase steps')
  if (Number(metric.instagram || 0) + Number(metric.whatsapp || 0) > 180) suggestions.push('Reduce social media')
  if (Number(metric.sleepHours || 0) < 7) suggestions.push('Sleep early')
  if (Number(metric.screenTime || 0) > 5) suggestions.push('Reduce screen time')
  if (suggestions.length === 0) suggestions.push('Maintain current routine')

  return suggestions
}

const getPredictions = async (req, res, next) => {
  try {
    const metrics = await getMetrics(req.user._id)
    const latest = getLatest(metrics)
    const prediction = latest.tomorrowPrediction || { moodLabel: latest.moodLabel, moodScore: latest.moodScore, confidence: 70, stressScore: latest.stressScore }
    const confidence = Number(prediction.confidence || 0)
    const expectedSleep = Number(latest.sleepHours || 0) >= 7 ? Number(latest.sleepHours || 0) : Number(latest.sleepHours || 0) + 0.5
    const expectedSteps = Math.round(Number(latest.steps || 0) * 1.05)
    const expectedScreenTime = Math.max(0, Number(latest.screenTime || 0) - 0.25)

    return res.status(200).json({
      tomorrowMood: prediction.moodLabel,
      tomorrowConfidence: confidence,
      tomorrowMoodScore: prediction.moodScore,
      tomorrowStressScore: prediction.stressScore,
      moodForecast: toDailyData(metrics).map((metric, index) => ({ day: metric.day, value: Math.min(100, metric.mood + index) })),
      stressForecast: toDailyData(metrics).map((metric, index) => ({ day: metric.day, value: Math.max(0, metric.stress - index) })),
      behavioralForecast: [
        { label: 'Expected Sleep', value: `${expectedSleep.toFixed(1)}h`, icon: '☾', tone: 'text-cyan-300' },
        { label: 'Expected Steps', value: expectedSteps.toLocaleString(), icon: '🚶', tone: 'text-emerald-300' },
        { label: 'Expected Screen Time', value: `${expectedScreenTime.toFixed(1)}h`, icon: '▯', tone: 'text-violet-300' },
      ],
      confidenceLevels: [
        { label: 'Model Confidence', value: confidence, color: 'bg-emerald-400' },
        { label: 'Mood Stability', value: Math.max(0, 100 - Math.abs(Number(prediction.moodScore || 0) - Number(latest.moodScore || 0))), color: 'bg-violet-400' },
        { label: 'Stress Stability', value: Math.max(0, 100 - Math.abs(Number(prediction.stressScore || 0) - Number(latest.stressScore || 0))), color: 'bg-cyan-400' },
      ],
      improvementSuggestions: getImprovementSuggestions(latest),
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
    const reportDate = normalizeReportDate(latest.date)
    const cachedReport = await AgentReports.findOne({ userId: req.user._id, date: reportDate }).lean()

    if (cachedReport) {
      const cachedAnalysis = { ...cachedReport.analysis, cached: true }

      return res.status(200).json(buildInsightsResponse({
        latest,
        aiData: cachedAnalysis,
        payload: cachedReport.requestPayload,
        aiService: {
          success: true,
          cached: true,
          source: 'MongoDB Cache',
          error: null,
        },
        report: { ...cachedReport, source: 'MongoDB Cache' },
      }))
    }

    const aiAnalysis = await analyzeDailyMetrics({ metrics, user: req.user })
    const savedReport = await saveAnalysisReport({
      userId: req.user._id,
      latest,
      reportDate,
      aiAnalysis,
    })
    const payload = aiAnalysis.payload || buildFastApiPayload({ metrics, user: req.user })

    return res.status(200).json(buildInsightsResponse({
      latest,
      aiData: aiAnalysis.data,
      payload,
      aiService: {
        success: aiAnalysis.success,
        cached: false,
        source: aiAnalysis.success ? 'FastAPI' : null,
        error: aiAnalysis.error,
      },
      report: savedReport,
    }))
  } catch (error) {
    next(error)
  }
}

module.exports = { getAiInsights, getAnalytics, getDashboard, getPredictions }
