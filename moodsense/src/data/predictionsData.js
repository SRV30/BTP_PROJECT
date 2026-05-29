export const tomorrowMoodPrediction = {
  mood: 'Happy',
  confidence: 82,
  score: 86,
}

export const tomorrowStressPrediction = {
  score: 39,
  status: 'Low Stress',
}

export const moodForecast = [
  { day: 'Mon', score: 86 },
  { day: 'Tue', score: 82 },
  { day: 'Wed', score: 84 },
  { day: 'Thu', score: 79 },
  { day: 'Fri', score: 83 },
  { day: 'Sat', score: 88 },
  { day: 'Sun', score: 85 },
]

export const stressForecast = [
  { day: 'Mon', score: 39 },
  { day: 'Tue', score: 42 },
  { day: 'Wed', score: 45 },
  { day: 'Thu', score: 41 },
  { day: 'Fri', score: 38 },
  { day: 'Sat', score: 34 },
  { day: 'Sun', score: 36 },
]

export const behavioralForecast = [
  { label: 'Expected Sleep', value: '7h 30m', icon: '☾', tone: 'text-cyan-300' },
  { label: 'Expected Steps', value: '6,800', icon: '🚶', tone: 'text-emerald-300' },
  { label: 'Expected Screen Time', value: '3h 55m', icon: '▯', tone: 'text-violet-300' },
]

export const confidenceLevels = [
  { label: 'High', value: 82, color: 'bg-emerald-400' },
  { label: 'Medium', value: 54, color: 'bg-violet-400' },
  { label: 'Low', value: 24, color: 'bg-slate-500' },
]

export const improvementSuggestions = ['Increase steps', 'Reduce social media', 'Sleep early']

export const predictionExplanation = 'Based on your recent sleep, activity levels, and screen usage, your mood is expected to remain positive.'
