const { buildContext } = require("./contextBuilderService");

const injectContext = async (payload, userId) => {
  const context = await buildContext(userId);

  return {
    ...payload,

    memories: context.memories,

    goals: context.goals,

    reflections: context.reflections,
  };
};

module.exports = {
  injectContext,
};
