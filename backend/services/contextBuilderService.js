const Goal = require("../models/Goal");

const AgentMemory = require("../models/AgentMemory");

const Reflection = require("../models/Reflection");

const buildContext = async (userId) => {
  const [memories, goals, reflections] = await Promise.all([
    AgentMemory.find({
      userId,
    })
      .sort({
        importance: -1,
      })
      .limit(10),

    Goal.find({
      userId,
      status: "ACTIVE",
    }),

    Reflection.find({
      userId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(3),
  ]);

  return {
    memories,
    goals,
    reflections,
  };
};

module.exports = {
  buildContext,
};
