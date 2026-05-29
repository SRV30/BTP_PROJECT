const express = require('express')
const { getDepressionRisk, previewDepressionRisk } = require('../controllers/depressionRiskController')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/depression-risk/preview', previewDepressionRisk)
router.get('/depression-risk', authMiddleware, getDepressionRisk)

module.exports = router
