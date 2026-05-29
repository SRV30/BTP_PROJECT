const express = require('express')
const { previewMood, storeMoodMetrics } = require('../controllers/moodEngineController')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/mood-engine/preview', previewMood)
router.post('/mood-engine', authMiddleware, storeMoodMetrics)

module.exports = router
