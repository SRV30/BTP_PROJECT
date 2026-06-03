const buildPrompt = (context) => {
  return `
USER MEMORIES

${context.memories.map((memory) => `- ${memory.content}`).join("\n")}

ACTIVE GOALS

${context.goals.map((goal) => `- ${goal.title}`).join("\n")}

RECENT REFLECTIONS

${context.reflections.map((reflection) => `- ${reflection.summary}`).join("\n")}
`;
};

module.exports = {
  buildPrompt,
};
