const mongoose = require('mongoose')

const recommendationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
)

const analysisDataSchema = new mongoose.Schema(
  {
    behaviorSummary: {
      type: String,
      required: true,
      trim: true,
    },
    moodAnalysis: {
      type: String,
      required: true,
      trim: true,
    },
    stressAnalysis: {
      type: String,
      required: true,
      trim: true,
    },
    depressionAnalysis: {
      type: String,
      required: true,
      trim: true,
    },
    predictionAnalysis: {
      type: String,
      required: true,
      trim: true,
    },
    recommendations: {
      type: [recommendationSchema],
      default: [],
    },
    model: {
      type: String,
      trim: true,
      default: '',
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    cached: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
)

const requestPayloadSchema = new mongoose.Schema(
  {
    userId: String,
    userName: String,
    currentDate: String,
    currentTimeSlot: String,
    averageSleep: Number,
    averageSteps: Number,
    averageScreenTime: Number,
    instagramUsage: Number,
    whatsappUsage: Number,
    linkedinUsage: Number,
    gmailUsage: Number,
    unacademyUsage: Number,
    moodScore: Number,
    moodLabel: String,
    stressScore: Number,
    stressLevel: String,
    depressionRisk: String,
    tomorrowMood: String,
    tomorrowConfidence: Number,
    weeklyTrend: String,
    happyDays: Number,
    neutralDays: Number,
    sadDays: Number,
    weeklyMoodScores: [Number],
  },
  { _id: false },
)

const agentReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    dailyMetricsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DailyMetrics',
      index: true,
    },
    date: {
      type: Date,
      required: true,
      set: (value) => {
        const date = new Date(value)
        date.setUTCHours(0, 0, 0, 0)
        return date
      },
    },
    requestPayload: {
      type: requestPayloadSchema,
      required: true,
    },
    analysis: {
      type: analysisDataSchema,
      required: true,
    },
    fastApiResponse: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    source: {
      type: String,
      enum: ['FastAPI', 'MongoDB Cache'],
      default: 'FastAPI',
    },
  },
  {
    timestamps: true,
  },
)

agentReportSchema.index({ userId: 1, date: 1 }, { unique: true })

module.exports = mongoose.model('AgentReports', agentReportSchema)
