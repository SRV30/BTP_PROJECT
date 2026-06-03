const DailyLog = require("../models/DailyLog");
const DailyMetrics = require("../models/DailyMetrics");

const average = (values) => {
  if (!values.length) return 0;

  return (
    values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length
  );
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

    sleepHours: average(logs.map((log) => log.sleep)),

    steps: Math.round(average(logs.map((log) => log.steps))),

    screenTime: average(logs.map((log) => log.screenTime)),

    instagram: average(logs.map((log) => log.instagramUsage)),

    whatsapp: average(logs.map((log) => log.whatsappUsage)),

    linkedin: average(logs.map((log) => log.linkedinUsage)),

    gmail: average(logs.map((log) => log.gmailUsage)),

    unacademy: average(logs.map((log) => log.unacademyUsage)),
  };

  return payload;
};

module.exports = {
  aggregateDailyLogs,
};
