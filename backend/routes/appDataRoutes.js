const express = require('express')
const { getAiInsights, getAnalytics, getDashboard, getPredictions } = require('../controllers/appDataController')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)
router.get('/dashboard', getDashboard)
router.get('/analytics', getAnalytics)
router.get('/predictions', getPredictions)
router.get('/insights', getAiInsights)

module.exports = router
