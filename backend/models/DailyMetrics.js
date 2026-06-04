const mongoose = require('mongoose')

const tomorrowPredictionSchema = new mongoose.Schema(
  {
    moodLabel: {
      type: String,
      trim: true,
      default: '',
    },
    moodScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    stressScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  { _id: false },
)

const dailyMetricsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
    sleepHours: {
      type: Number,
      min: 0,
      default: 0,
    },
    steps: {
      type: Number,
      min: 0,
      default: 0,
    },
    screenTime: {
      type: Number,
      min: 0,
      default: 0,
    },
    instagram: {
      type: Number,
      min: 0,
      default: 0,
    },
    whatsapp: {
      type: Number,
      min: 0,
      default: 0,
    },
    linkedin: {
      type: Number,
      min: 0,
      default: 0,
    },
    gmail: {
      type: Number,
      min: 0,
      default: 0,
    },
    udemy: {
      type: Number,
      min: 0,
      default: 0,
    },
    moodScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    moodLabel: {
      type: String,
      required: true,
      trim: true,
    },
    stressScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    depressionRisk: {
      type: String,
      enum: ['Low', 'Moderate', 'High'],
      default: 'Low',
    },
    tomorrowPrediction: {
      type: tomorrowPredictionSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  },
)

dailyMetricsSchema.index({ userId: 1, date: 1 }, { unique: true })

module.exports = mongoose.model('DailyMetrics', dailyMetricsSchema)
