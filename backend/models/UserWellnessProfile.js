const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },

    sleepPattern: String,
    activityPattern: String,
    screenTimePattern: String,

    dominantMood: String,

    riskLevel: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserWellnessProfile", schema);
