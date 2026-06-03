const { runAgentPipeline } = require("../services/agentOrchestratorService");

const runDailyAgentJob = async ({ userId, metrics }) => {
  return runAgentPipeline({
    userId,
    metrics,
  });
};

module.exports = {
  runDailyAgentJob,
};
