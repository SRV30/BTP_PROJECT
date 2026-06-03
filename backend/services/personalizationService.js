const generatePersonalization = (context) => {
  const profile = {
    strengths: [],
    risks: [],
  };

  context.memories.forEach((memory) => {
    if (memory.importance >= 8) {
      profile.risks.push(memory.content);
    }
  });

  return profile;
};

module.exports = {
  generatePersonalization,
};
