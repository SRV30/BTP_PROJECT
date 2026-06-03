const { generateMemories } = require("./memoryGenerationService");

const { updateGoalProgress } = require("./goalTrackingService");

const { generateTasksFromGoals } = require("./plannerService");

const { generateWeeklyReflection } = require("./reflectionService");

const { generateWeeklyReport } = require("./weeklyReportService");

const runAgentPipeline = async ({ userId, metrics }) => {
  await generateMemories({
    userId,
    metrics: [metrics],
  });

  await updateGoalProgress(userId, metrics);

  await generateTasksFromGoals(userId);

  return {
    success: true,
  };
};

const runWeeklyPipeline = async (userId) => {
  const reflection = await generateWeeklyReflection(userId);

  const report = await generateWeeklyReport(userId);

  return {
    reflection,
    report,
  };
};

module.exports = {
  runAgentPipeline,
  runWeeklyPipeline,
};
