const Goal = require("../models/Goal");

const createGoal = async (req, res, next) => {
  try {
    const goal = await Goal.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json(goal);
  } catch (error) {
    next(error);
  }
};

const getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({
      userId: req.user._id,
    });

    res.status(200).json(goals);
  } catch (error) {
    next(error);
  }
};

const getActiveGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({
      userId: req.user._id,

      status: "ACTIVE",
    });

    res.status(200).json(goals);
  } catch (error) {
    next(error);
  }
};

const updateGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      {
        _id: req.params.id,

        userId: req.user._id,
      },

      req.body,

      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(goal);
  } catch (error) {
    next(error);
  }
};

const deleteGoal = async (req, res, next) => {
  try {
    await Goal.findOneAndDelete({
      _id: req.params.id,

      userId: req.user._id,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGoal,
  getGoals,
  getActiveGoals,
  updateGoal,
  deleteGoal,
};
