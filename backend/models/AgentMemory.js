const mongoose = require("mongoose");

const agentMemorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    memoryType: {
      type: String,
      enum: ["BEHAVIOR", "MOOD", "STRESS", "PATTERN", "GOAL", "REFLECTION"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    importance: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AgentMemory", agentMemorySchema);
