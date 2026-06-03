const Goal = require("../models/Goal");
const AgentTask = require("../models/AgentTask");
const AgentMemory = require("../models/AgentMemory");

const buildAIContext = async (userId) => {
  const [memories, goals, tasks] = await Promise.all([
    AgentMemory.find({
      userId,
    })
      .sort({
        importance: -1,
        createdAt: -1,
      })
      .limit(10),

    Goal.find({
      userId,
      status: "ACTIVE",
    }),

    AgentTask.find({
      userId,
      status: {
        $ne: "COMPLETED",
      },
    }),
  ]);

  return {
    memories,
    goals,
    tasks,
  };
};

module.exports = {
  buildAIContext,
};
