const Reflection = require("../models/Reflection");

const { generateWeeklyReflection } = require("../services/reflectionService");

const createReflection = async (req, res, next) => {
  try {
    const reflection = await generateWeeklyReflection(req.user._id);

    res.status(201).json(reflection);
  } catch (error) {
    next(error);
  }
};

const getReflections = async (req, res, next) => {
  try {
    const reflections = await Reflection.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(reflections);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReflection,
  getReflections,
};
