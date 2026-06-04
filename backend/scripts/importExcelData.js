const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const xlsx = require('xlsx')

const { connectDB } = require('../config/db')
const DailyMetrics = require('../models/DailyMetrics')
const User = require('../models/User')
const { calculateMood, getMoodLabel } = require('../services/moodEngineService')

const DEFAULT_PASSWORD = process.env.IMPORT_DEFAULT_PASSWORD || 'MoodSense@123'
const DEFAULT_DATA_DIR = path.resolve(__dirname, '../../data')

const FIELD_ALIASES = {
  email: ['email', 'user_id', 'userId', 'user'],
  date: ['date', 'day'],
  sleepHours: ['sleepHours', 'sleep_hours', 'sleep', 'sleep_hour', 'sleep_hrs'],
  steps: ['steps', 'daily_steps'],
  screenTime: ['screenTime', 'screen_time', 'screen_time_hours', 'screenTimeHours'],
  instagram: ['instagram', 'instagram_mins', 'instagram_usage', 'instagram_minutes'],
  whatsapp: ['whatsapp', 'whatsapp_mins', 'whatsapp_usage', 'whatsapp_minutes'],
  linkedin: ['linkedin', 'linkedin_mins', 'linkedin_usage', 'linkedin_minutes'],
  gmail: ['gmail', 'gmail_mins', 'gmail_usage', 'gmail_minutes'],
  udemy: ['udemy', 'udemy_mins', 'udemy_usage', 'udemy_minutes'],
  moodScore: ['moodScore', 'mood_score'],
  moodLabel: ['moodLabel', 'mood_label', 'mood'],
  stressScore: ['stressScore', 'stress_score'],
  depressionRisk: ['depressionRisk', 'depression_risk'],
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const normalizeKey = (key) => String(key).trim().toLowerCase().replace(/[^a-z0-9]/g, '')

const normalizeEmail = (email) => String(email || '').trim().toLowerCase()

const titleCase = (value) =>
  String(value || '')
    .replace(/[-_.]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())

const getRowValue = (row, aliases) => {
  const normalizedRow = Object.entries(row).reduce((result, [key, value]) => {
    result[normalizeKey(key)] = value
    return result
  }, {})

  const matchedAlias = aliases.find((alias) => normalizeKey(alias) in normalizedRow)
  return matchedAlias ? normalizedRow[normalizeKey(matchedAlias)] : undefined
}

const toNumber = (value, fallback = 0) => {
  if (value === null || value === undefined || value === '') {
    return fallback
  }

  const parsed = Number.parseFloat(String(value).replace(/,/g, '').match(/-?\d+(\.\d+)?/)?.[0])
  return Number.isFinite(parsed) ? parsed : fallback
}

const toDate = (value) => {
  if (value instanceof Date) {
    const date = new Date(value)
    date.setUTCHours(0, 0, 0, 0)
    return date
  }

  if (typeof value === 'number') {
    const excelEpoch = Date.UTC(1899, 11, 30)
    const date = new Date(excelEpoch + value * 24 * 60 * 60 * 1000)
    date.setUTCHours(0, 0, 0, 0)
    return date
  }

  const date = new Date(String(value || '').trim())
  if (Number.isNaN(date.getTime())) {
    return null
  }

  date.setUTCHours(0, 0, 0, 0)
  return date
}

const moodLabelFromScore = (score) => {
  if (score >= 80) return 'Happy'
  if (score >= 65) return 'Good'
  if (score >= 50) return 'Neutral'
  if (score >= 35) return 'Low'
  return 'Sad'
}

const normalizeDepressionRisk = (value) => {
  const risk = titleCase(value)
  return ['Low', 'Moderate', 'High'].includes(risk) ? risk : 'Low'
}

const depressionRiskFromScores = (moodScore, stressScore, sleepHours) => {
  if (moodScore < 45 || stressScore > 75 || sleepHours < 5) {
    return 'High'
  }

  if (moodScore < 65 || stressScore > 55 || sleepHours < 6) {
    return 'Moderate'
  }

  return 'Low'
}

const deriveStressScore = ({ sleepHours, steps, screenTime }) => {
  const screenLoad = clamp(screenTime * 8, 0, 45)
  const sleepLoad = clamp((7 - sleepHours) * 10, -10, 35)
  const inactivityLoad = clamp((6000 - steps) / 180, -10, 30)
  return Math.round(clamp(35 + screenLoad + sleepLoad + inactivityLoad, 0, 100))
}

const deriveMoodScore = ({ sleepHours, steps, screenTime, stressScore }) => {
  const sleepBoost = clamp((sleepHours - 5) * 8, -15, 20)
  const stepBoost = clamp(steps / 500, 0, 18)
  const screenPenalty = clamp((screenTime - 4) * 5, 0, 18)
  const stressPenalty = stressScore * 0.25
  return Math.round(clamp(68 + sleepBoost + stepBoost - screenPenalty - stressPenalty, 0, 100))
}

const resolveUserName = (filePath, email) => {
  const fileName = titleCase(path.basename(filePath, path.extname(filePath)))
  if (fileName) {
    return fileName
  }

  return titleCase(email.split('@')[0]) || 'MoodSense User'
}

const getOrCreateUser = async ({ email, filePath }) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return { user: existingUser, created: false }
  }

  const user = await User.create({
    name: resolveUserName(filePath, email),
    email,
    password: DEFAULT_PASSWORD,
    avatar: '',
  })

  return { user, created: true }
}

const buildMetricPayload = ({ row, userId }) => {
  const sleepHours = toNumber(getRowValue(row, FIELD_ALIASES.sleepHours))
  const steps = Math.round(toNumber(getRowValue(row, FIELD_ALIASES.steps)))
  const screenTime = toNumber(getRowValue(row, FIELD_ALIASES.screenTime))
  const appUsage = {
    instagram: toNumber(getRowValue(row, FIELD_ALIASES.instagram)),
    whatsapp: toNumber(getRowValue(row, FIELD_ALIASES.whatsapp)),
    linkedin: toNumber(getRowValue(row, FIELD_ALIASES.linkedin)),
    gmail: toNumber(getRowValue(row, FIELD_ALIASES.gmail)),
    udemy: toNumber(getRowValue(row, FIELD_ALIASES.udemy)),
  }
  const mood = calculateMood({ sleep: sleepHours, steps, screenTime, appUsage })
  const depressionRisk = normalizeDepressionRisk(
    getRowValue(row, FIELD_ALIASES.depressionRisk) ||
      depressionRiskFromScores(mood.moodScore, mood.stressScore, sleepHours),
  )

  return {
    userId,
    date: toDate(getRowValue(row, FIELD_ALIASES.date)),
    sleepHours,
    steps,
    screenTime,
    ...appUsage,
    moodScore: mood.moodScore,
    moodLabel: mood.moodLabel,
    stressScore: mood.stressScore,
    depressionRisk,
    tomorrowPrediction: {
      moodLabel: getMoodLabel(clamp(mood.moodScore + 2, 0, 100)),
      moodScore: clamp(mood.moodScore + 2, 0, 100),
      confidence: 82,
      stressScore: clamp(mood.stressScore - 3, 0, 100),
    },
  }
}

const getExcelFiles = (dataDir) =>
  fs
    .readdirSync(dataDir)
    .filter((fileName) => /\.xlsx?$/i.test(fileName) && !fileName.startsWith('~$'))
    .map((fileName) => path.join(dataDir, fileName))

const readWorkbookRows = (filePath) => {
  const workbook = xlsx.readFile(filePath, { cellDates: true })
  return workbook.SheetNames.flatMap((sheetName) =>
    xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '', raw: false }),
  )
}

const importExcelFiles = async (dataDir = DEFAULT_DATA_DIR) => {
  const files = getExcelFiles(dataDir)
  const totals = {
    files: files.length,
    rows: 0,
    usersCreated: 0,
    metricsInserted: 0,
    metricsSkipped: 0,
    invalidRows: 0,
  }

  for (const filePath of files) {
    const rows = readWorkbookRows(filePath)
    totals.rows += rows.length

    for (const row of rows) {
      const email = normalizeEmail(getRowValue(row, FIELD_ALIASES.email))
      const date = toDate(getRowValue(row, FIELD_ALIASES.date))

      if (!email || !date) {
        totals.invalidRows += 1
        continue
      }

      const { user, created } = await getOrCreateUser({ email, filePath })
      if (created) {
        totals.usersCreated += 1
      }

      const metric = buildMetricPayload({ row, userId: user._id })
      const result = await DailyMetrics.updateOne(
        { userId: user._id, date: metric.date },
        { $setOnInsert: metric },
        { upsert: true, runValidators: true },
      )

      if (result.upsertedCount > 0) {
        totals.metricsInserted += 1
      } else {
        totals.metricsSkipped += 1
      }
    }
  }

  return totals
}

const run = async () => {
  const dataDir = path.resolve(process.argv[2] || process.env.IMPORT_DATA_DIR || DEFAULT_DATA_DIR)

  if (!fs.existsSync(dataDir)) {
    throw new Error(`Data folder not found: ${dataDir}`)
  }

  await connectDB()

  if (mongoose.connection.readyState !== 1) {
    throw new Error('MongoDB connection is required before importing Excel data. Set MONGO_URI in backend/.env.')
  }

  const totals = await importExcelFiles(dataDir)
  console.log('Excel import completed:', totals)

  await mongoose.connection.close()
}

if (require.main === module) {
  run().catch(async (error) => {
    console.error('Excel import failed:', error.message)
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close()
    }
    process.exit(1)
  })
}

module.exports = { importExcelFiles }
