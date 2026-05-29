const { analyzeDepressionRisk, getDepressionRiskForUser } = require('../services/depressionRiskService')

const previewDepressionRisk = (req, res) => {
  const metrics = Array.isArray(req.body.metrics) ? req.body.metrics : []

  if (metrics.length === 0) {
    return res.status(400).json({ message: 'Provide a metrics array with up to 7 days of tracked data' })
  }

  return res.status(200).json({ analysis: analyzeDepressionRisk(metrics) })
}

const getDepressionRisk = async (req, res, next) => {
  try {
    const { analysis, metrics } = await getDepressionRiskForUser({
      userId: req.user._id,
      endDate: req.query.endDate,
    })

    return res.status(200).json({
      analysis,
      metrics,
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getDepressionRisk,
  previewDepressionRisk,
}
