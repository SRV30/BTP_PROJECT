const { calculateStress, saveStressMetrics } = require('../services/stressEngineService')

const getInstagramUsage = (body) => body.appUsage?.instagram ?? body.instagram

const validateStressInput = ({ sleep, sleepHours, steps, screenTime, instagram }) => {
  if (
    (sleep === undefined && sleepHours === undefined) ||
    steps === undefined ||
    screenTime === undefined ||
    instagram === undefined
  ) {
    return 'sleep or sleepHours, steps, screenTime, and instagram usage are required'
  }

  return null
}

const previewStress = (req, res) => {
  const { sleep, sleepHours, steps, screenTime } = req.body
  const instagram = getInstagramUsage(req.body)
  const validationError = validateStressInput({ sleep, sleepHours, steps, screenTime, instagram })

  if (validationError) {
    return res.status(400).json({ message: validationError })
  }

  const stress = calculateStress({
    sleep: sleep ?? sleepHours,
    steps,
    screenTime,
    instagram,
  })

  return res.status(200).json({ stress })
}

const storeStressMetrics = async (req, res, next) => {
  try {
    const { date, sleep, sleepHours, steps, screenTime } = req.body
    const instagram = getInstagramUsage(req.body)
    const validationError = validateStressInput({ sleep, sleepHours, steps, screenTime, instagram })

    if (validationError) {
      return res.status(400).json({ message: validationError })
    }

    const { metrics, stress } = await saveStressMetrics({
      userId: req.user._id,
      date,
      sleep,
      sleepHours,
      steps,
      screenTime,
      instagram,
    })

    if (!metrics) {
      return res.status(404).json({ message: 'Daily metrics record not found for this user and date' })
    }

    return res.status(200).json({
      message: 'Stress metrics stored successfully',
      stress,
      metrics,
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  previewStress,
  storeStressMetrics,
}
