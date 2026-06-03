const DailyLog = require("../models/DailyLog");
const {
  aggregateDailyLogs,
} = require("../services/dailyLogAggregationService");
const { saveMoodMetrics } = require("../services/moodEngineService");

const normalizeDate = (value = new Date()) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setUTCHours(0, 0, 0, 0);
  return date;
};

const createLog = async (req, res, next) => {
  try {
    const log = await DailyLog.create({
      ...req.body,
      userId: req.user._id,
    });

    return res.status(201).json({
      message: "Daily log created successfully",
      log,
    });

    await refreshDailyMetrics(req.user._id, log.date);
  } catch (error) {
    return next(error);
  }
};

const getLogs = async (req, res, next) => {
  try {
    const logs = await DailyLog.find({
      userId: req.user._id,
    }).sort({ date: -1, createdAt: -1 });

    return res.status(200).json(logs);
  } catch (error) {
    return next(error);
  }
};

const getLatestLog = async (req, res, next) => {
  try {
    const log = await DailyLog.findOne({
      userId: req.user._id,
    }).sort({ date: -1, createdAt: -1 });

    return res.status(200).json(log);
  } catch (error) {
    return next(error);
  }
};

const getLogsByDate = async (req, res, next) => {
  try {
    const date = normalizeDate(req.params.date);

    if (!date) {
      return res.status(400).json({
        message: "Invalid date",
      });
    }

    const nextDate = new Date(date);
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);

    const logs = await DailyLog.find({
      userId: req.user._id,
      date: {
        $gte: date,
        $lt: nextDate,
      },
    }).sort({ createdAt: 1 });

    return res.status(200).json(logs);
  } catch (error) {
    return next(error);
  }
};

const updateLog = async (req, res, next) => {
  try {
    const log = await DailyLog.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!log) {
      return res.status(404).json({
        message: "Log not found",
      });
    }

    return res.status(200).json({
      message: "Log updated successfully",
      log,
    });

    await refreshDailyMetrics(req.user._id, log.date);
  } catch (error) {
    return next(error);
  }
};

const deleteLog = async (req, res, next) => {
  try {
    const log = await DailyLog.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!log) {
      return res.status(404).json({
        message: "Log not found",
      });
    }

    return res.status(200).json({
      message: "Log deleted successfully",
    });

    await refreshDailyMetrics(req.user._id, log.date);
  } catch (error) {
    return next(error);
  }
};

const refreshDailyMetrics = async (userId, date) => {
  const aggregated = await aggregateDailyLogs({
    userId,
    date,
  });

  if (!aggregated) {
    return;
  }

  await saveMoodMetrics({
    userId,
    date,
    sleepHours: aggregated.sleepHours,
    steps: aggregated.steps,
    screenTime: aggregated.screenTime,

    appUsage: {
      instagram: aggregated.instagram,

      whatsapp: aggregated.whatsapp,

      linkedin: aggregated.linkedin,

      gmail: aggregated.gmail,

      unacademy: aggregated.unacademy,
    },
  });
};

const getHistory = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 30);

    const logs = await DailyLog.find({
      userId: req.user._id,
    })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await DailyLog.countDocuments({
      userId: req.user._id,
    });

    return res.status(200).json({
      page,
      total,
      logs,
    });
  } catch (error) {
    return next(error);
  }
};

const getCalendar = async (req, res, next) => {
  try {
    const logs = await DailyLog.find(
      {
        userId: req.user._id,
      },
      {
        date: 1,
        slot: 1,
      }
    );

    return res.status(200).json(logs);
  } catch (error) {
    return next(error);
  }
};

const average = (values) => {
  if (!values.length) return 0;

  return (
    values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length
  );
};

const getStats = async (req, res, next) => {
  try {
    const logs = await DailyLog.find({
      userId: req.user._id,
    });

    return res.status(200).json({
      totalLogs: logs.length,

      averageSleep: Number(average(logs.map((l) => l.sleep)).toFixed(1)),

      averageSteps: Math.round(average(logs.map((l) => l.steps))),

      averageScreenTime: Number(
        average(logs.map((l) => l.screenTime)).toFixed(1)
      ),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createLog,
  getLogs,
  getLatestLog,
  getLogsByDate,
  updateLog,
  deleteLog,
  refreshDailyMetrics,
  getHistory,
  getCalendar,
  getStats,
};
