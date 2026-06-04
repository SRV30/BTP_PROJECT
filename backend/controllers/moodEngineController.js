const { calculateMood, saveMoodMetrics } = require('../services/moodEngineService')

const buildAppUsage = (body) => ({
  instagram: body.appUsage?.instagram ?? body.instagram,
  whatsapp: body.appUsage?.whatsapp ?? body.whatsapp,
  linkedin: body.appUsage?.linkedin ?? body.linkedin,
  gmail: body.appUsage?.gmail ?? body.gmail,
  udemy: body.appUsage?.udemy ?? body.udemy,
})

const validateMoodInput = ({ sleep, sleepHours, steps, screenTime }) => {
  if ((sleep === undefined && sleepHours === undefined) || steps === undefined || screenTime === undefined) {
    return 'sleep or sleepHours, steps, and screenTime are required'
  }

  return null
}

const previewMood = (req, res) => {
  const { sleep, sleepHours, steps, screenTime } = req.body
  const validationError = validateMoodInput({ sleep, sleepHours, steps, screenTime })

  if (validationError) {
    return res.status(400).json({ message: validationError })
  }

  const mood = calculateMood({
    sleep: sleep ?? sleepHours,
    steps,
    screenTime,
    appUsage: buildAppUsage(req.body),
  })

  return res.status(200).json({ mood })
}

const storeMoodMetrics = async (req, res, next) => {
  try {
    const { date, sleep, sleepHours, steps, screenTime } = req.body
    const validationError = validateMoodInput({ sleep, sleepHours, steps, screenTime })

    if (validationError) {
      return res.status(400).json({ message: validationError })
    }

    const { metrics, mood } = await saveMoodMetrics({
      userId: req.user._id,
      date,
      sleep,
      sleepHours,
      steps,
      screenTime,
      appUsage: buildAppUsage(req.body),
    })

    return res.status(200).json({
      message: 'Mood metrics stored successfully',
      mood,
      metrics,
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  previewMood,
  storeMoodMetrics,
}
