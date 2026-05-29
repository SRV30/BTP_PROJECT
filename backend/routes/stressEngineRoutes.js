const express = require('express')
const { previewStress, storeStressMetrics } = require('../controllers/stressEngineController')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/stress-engine/preview', previewStress)
router.post('/stress-engine', authMiddleware, storeStressMetrics)

module.exports = router
