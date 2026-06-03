const mongoose = require("mongoose");

const agentInsightSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    type: {
      type: String,

      enum: ["PATTERN", "WARNING", "SUCCESS", "RECOMMENDATION"],
    },

    title: String,

    content: String,

    confidence: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AgentInsight", agentInsightSchema);
