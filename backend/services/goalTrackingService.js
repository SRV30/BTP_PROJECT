const Goal = require("../models/Goal");

const updateGoalProgress = async (userId, metrics) => {
  const goals = await Goal.find({
    userId,
    status: "ACTIVE",
  });

  for (const goal of goals) {
    let currentValue = 0;

    switch (goal.category) {
      case "SLEEP":
        currentValue = metrics.sleepHours;
        break;

      case "STEPS":
        currentValue = metrics.steps;
        break;

      case "SCREEN_TIME":
        currentValue = metrics.screenTime;
        break;

      case "MOOD":
        currentValue = metrics.moodScore;
        break;

      case "STRESS":
        currentValue = metrics.stressScore;
        break;
    }

    goal.currentValue = currentValue;

    if (currentValue >= goal.targetValue) {
      goal.status = "COMPLETED";
    }

    await goal.save();
  }
};

module.exports = {
  updateGoalProgress,
};
