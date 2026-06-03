const { runWeeklyPipeline } = require("../services/agentOrchestratorService");

const runWeeklyAgentJob = async (userId) => {
  return runWeeklyPipeline(userId);
};

module.exports = {
  runWeeklyAgentJob,
};
