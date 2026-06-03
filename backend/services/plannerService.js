const Goal = require("../models/Goal");
const AgentTask = require("../models/AgentTask");

const generateTasksFromGoals = async (userId) => {
  const goals = await Goal.find({
    userId,
    status: "ACTIVE",
  });

  const tasks = [];

  for (const goal of goals) {
    let task = null;

    switch (goal.category) {
      case "SLEEP":
        task = {
          title: "Sleep before 11 PM",
          description: "Maintain consistent sleep schedule",
        };
        break;

      case "STEPS":
        task = {
          title: "Walk 2000 extra steps",
          description: "Increase daily activity",
        };
        break;

      case "SCREEN_TIME":
        task = {
          title: "Reduce screen time by 1 hour",
          description: "Avoid excessive usage",
        };
        break;
    }

    if (task) {
      const created = await AgentTask.create({
        userId,
        goalId: goal._id,
        ...task,
      });

      tasks.push(created);
    }
  }

  return tasks;
};

module.exports = {
  generateTasksFromGoals,
};
