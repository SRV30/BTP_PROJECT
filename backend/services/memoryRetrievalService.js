const AgentMemory = require("../models/AgentMemory");

const getRelevantMemories = async (userId, limit = 10) => {
  return AgentMemory.find({
    userId,
  })
    .sort({
      importance: -1,
      createdAt: -1,
    })
    .limit(limit)
    .lean();
};

module.exports = {
  getRelevantMemories,
};
