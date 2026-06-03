const mongoose = require("mongoose");

const weeklyReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    weekStart: Date,

    weekEnd: Date,

    summary: String,

    moodAverage: Number,

    stressAverage: Number,

    completedGoals: Number,

    pendingGoals: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WeeklyReport", weeklyReportSchema);
