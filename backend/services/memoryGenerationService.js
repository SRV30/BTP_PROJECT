const { createMemory } = require("./agentMemoryService");

const generateMemories = async ({ userId, metrics }) => {
  if (!metrics.length) return;

  const latest = metrics[metrics.length - 1];

  if (latest.sleepHours < 6) {
    await createMemory({
      userId,

      memoryType: "PATTERN",

      title: "Low Sleep Detected",

      content: "User slept less than 6 hours.",

      importance: 8,
    });
  }

  if (latest.screenTime > 8) {
    await createMemory({
      userId,

      memoryType: "PATTERN",

      title: "High Screen Time",

      content: "Screen time exceeded 8 hours.",

      importance: 7,
    });
  }

  if (latest.moodScore > 75) {
    await createMemory({
      userId,

      memoryType: "MOOD",

      title: "Positive Mood",

      content: "User reported a strong mood score.",

      importance: 6,
    });
  }
};

module.exports = {
  generateMemories,
};
