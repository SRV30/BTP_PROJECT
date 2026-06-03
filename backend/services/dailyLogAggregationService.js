const DailyLog = require("../models/DailyLog");
const DailyMetrics = require("../models/DailyMetrics");

const sum = (values) => {
  return values.reduce((total, value) => total + Number(value || 0), 0);
};

const aggregateDailyLogs = async ({ userId, date }) => {
  const startDate = new Date(date);
  startDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + 1);

  const logs = await DailyLog.find({
    userId,
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  });

  if (!logs.length) {
    return null;
  }

  const payload = {
    userId,
    date: startDate,

    sleepHours: sum(logs.map((log) => log.sleep)),

    steps: sum(logs.map((log) => log.steps)),

    screenTime: sum(logs.map((log) => log.screenTime)),

    instagram: sum(logs.map((log) => log.instagramUsage)),

    whatsapp: sum(logs.map((log) => log.whatsappUsage)),

    linkedin: sum(logs.map((log) => log.linkedinUsage)),

    gmail: sum(logs.map((log) => log.gmailUsage)),

    unacademy: sum(logs.map((log) => log.unacademyUsage)),
  };

  return payload;
};

module.exports = {
  aggregateDailyLogs,
};
