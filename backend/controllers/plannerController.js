const AgentTask = require("../models/AgentTask");

const { generateTasksFromGoals } = require("../services/plannerService");

const generateTasks = async (req, res, next) => {
  try {
    const tasks = await generateTasksFromGoals(req.user._id);

    res.status(201).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await AgentTask.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await AgentTask.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateTasks,
  getTasks,
  updateTask,
};
