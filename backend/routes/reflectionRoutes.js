const express = require("express");

const {
  createReflection,
  getReflections,
} = require("../controllers/reflectionController");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/reflections", createReflection);

router.get("/reflections", getReflections);

module.exports = router;
