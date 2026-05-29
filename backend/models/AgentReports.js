const mongoose = require('mongoose')

const agentOutputSchema = new mongoose.Schema(
  {
    agentName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      default: '',
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    recommendations: {
      type: [String],
      default: [],
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
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
      index: true,
    },
    moodAgent: {
      type: agentOutputSchema,
      required: true,
    },
    stressAgent: {
      type: agentOutputSchema,
      required: true,
    },
    depressionAgent: {
      type: agentOutputSchema,
      required: true,
    },
    predictionAgent: {
      type: agentOutputSchema,
      required: true,
    },
    wellnessCoachAgent: {
      type: agentOutputSchema,
      required: true,
    },
    overallSummary: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  },
)

agentReportSchema.index({ userId: 1, date: 1 })

module.exports = mongoose.model('AgentReports', agentReportSchema)
