const DailyMetrics = require('../models/DailyMetrics')
const User = require('../models/User')
const { calculateWellnessPatterns } = require('../services/userWellnessProfileService')

const average = (values) => {
  if (values.length === 0) return 0
  return values.reduce((total, value) => total + Number(value || 0), 0) / values.length
}

const formatDate = (date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(date))

const buildProfileStats = (metrics) => ({
  daysTracked: metrics.length,
  averageMood: Math.round(average(metrics.map((metric) => metric.moodScore))),
  achievements: buildAchievements(metrics).length,
})

const buildAchievements = (metrics) => {
  const recentMetrics = metrics.slice(-7)
  const averageMood = Math.round(average(metrics.map((metric) => metric.moodScore)))
  const averageSteps = Math.round(average(recentMetrics.map((metric) => metric.steps)))
  const averageSleep = Number(average(recentMetrics.map((metric) => metric.sleepHours)).toFixed(1))
  const achievements = []

  if (metrics.length > 0) achievements.push({ title: 'First Check-in', icon: '✅', tone: 'from-emerald-500/20 to-cyan-500/10' })
  if (metrics.length >= 7) achievements.push({ title: '7 Day Streak', icon: '🔥', tone: 'from-rose-500/20 to-orange-500/10' })
  if (averageMood >= 75) achievements.push({ title: 'Mood Master', icon: '🧠', tone: 'from-violet-500/20 to-purple-500/10' })
  if (averageSteps >= 6000) achievements.push({ title: 'Active Lifestyle', icon: '🚶', tone: 'from-cyan-500/20 to-blue-500/10' })
  if (averageSleep >= 7) achievements.push({ title: 'Sleep Champion', icon: '☾', tone: 'from-indigo-500/20 to-sky-500/10' })

  return achievements
}

const buildActivityHistory = (metrics) => {
  const latest = metrics[metrics.length - 1]
  if (!latest) {
    return []
  }

  const prediction = latest.tomorrowPrediction || {}

  return [
    {
      title: `Mood logged on ${formatDate(latest.date)}`,
      description: `${latest.moodLabel} mood recorded with a ${latest.moodScore}/100 score.`,
      icon: '🙂',
    },
    {
      title: 'Latest stress update',
      description: `Stress score recorded at ${latest.stressScore}/100 with ${latest.sleepHours}h sleep and ${Number(latest.screenTime || 0).toFixed(1)}h screen time.`,
      icon: '⚡',
    },
    {
      title: 'Recent prediction',
      description: prediction.moodLabel ? `Tomorrow predicted ${prediction.moodLabel} with ${prediction.confidence}% confidence.` : 'No tomorrow prediction stored for the latest metrics entry.',
      icon: '🔮',
    },
  ]
}

const getProfile = async (req, res, next) => {
  try {
    const metrics = await DailyMetrics.find({ userId: req.user._id }).sort({ date: 1 }).lean()

    return res.status(200).json({
      user: req.user.toJSON(),
      stats: buildProfileStats(metrics),
      achievements: buildAchievements(metrics),
      activityHistory: buildActivityHistory(metrics),
      wellnessProfile: calculateWellnessPatterns(metrics),
    })
  } catch (error) {
    return next(error)
  }
}

const updateProfile = async (req, res, next) => {
  try {
    const allowedUpdates = ['name', 'avatar']
    const updates = allowedUpdates.reduce((profileUpdates, field) => {
      if (req.body[field] !== undefined) {
        return { ...profileUpdates, [field]: req.body[field] }
      }

      return profileUpdates
    }, {})

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Provide name or avatar to update' })
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    })

    return res.status(200).json({ user: user.toJSON() })
  } catch (error) {
    return next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' })
    }

    const user = await User.findById(req.user._id).select('+password')

    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()

    return res.status(200).json({
      message: 'Password changed successfully',
      user: user.toJSON(),
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  changePassword,
  getProfile,
  updateProfile,
}
