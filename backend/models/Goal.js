const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: ["SLEEP", "STEPS", "SCREEN_TIME", "MOOD", "STRESS"],
      required: true,
    },

    targetValue: {
      type: Number,
      required: true,
    },

    currentValue: {
      type: Number,
      default: 0,
    },

    unit: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "FAILED"],
      default: "ACTIVE",
    },

    dueDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
