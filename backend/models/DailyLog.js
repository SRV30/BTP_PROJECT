const mongoose = require("mongoose");

const dailyLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      set: (value) => {
        const date = new Date(value);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
    },

    slot: {
      type: String,
      enum: ["MORNING", "AFTERNOON", "EVENING", "NIGHT"],
      required: true,
    },

    sleep: {
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

    instagramUsage: {
      type: Number,
      min: 0,
      default: 0,
    },

    whatsappUsage: {
      type: Number,
      min: 0,
      default: 0,
    },

    linkedinUsage: {
      type: Number,
      min: 0,
      default: 0,
    },

    gmailUsage: {
      type: Number,
      min: 0,
      default: 0,
    },

    unacademyUsage: {
      type: Number,
      min: 0,
      default: 0,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

dailyLogSchema.index(
  {
    userId: 1,
    date: 1,
    slot: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("DailyLog", dailyLogSchema);
