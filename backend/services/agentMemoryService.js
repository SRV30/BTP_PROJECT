const AgentMemory = require("../models/AgentMemory");

const createMemory = async (memory) => {
  return AgentMemory.create(memory);
};

const getRecentMemories = async (userId, limit = 10) => {
  return AgentMemory.find({
    userId,
  })
    .sort({
      importance: -1,
      createdAt: -1,
    })
    .limit(limit);
};

module.exports = {
  createMemory,
  getRecentMemories,
};
