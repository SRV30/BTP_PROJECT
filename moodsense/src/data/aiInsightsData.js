export const insightTabs = ['Insights', 'Recommendations', 'Summary']

export const todayInsight = {
  title: 'Your mood is elevated.',
  description: 'You have been more positive than 82% of tracked days.',
}

export const moodAnalysis = {
  score: '84/100',
  mood: 'Happy',
  trend: 'Improving',
  explanation:
    'CrewAI detected stronger positive language, consistent activity signals, and stable sleep patterns. Your emotional momentum is trending upward compared with last week.',
}

export const stressAnalysis = {
  score: '42/100',
  status: 'Moderate',
  explanation:
    'Stress was influenced by afternoon screen time, task switching, and a shorter focus window after lunch. A short outdoor break helped prevent the score from rising further.',
}

export const depressionRiskAnalysis = {
  level: 'Low Risk',
  positiveIndicators: ['Stable sleep rhythm', 'Active lifestyle', 'Positive mood trend', 'Healthy communication patterns'],
  riskIndicators: ['Moderate screen time spikes', 'Midweek stress increase'],
  disclaimer: 'This is not a medical diagnosis. MoodSense AI insights are wellness indicators and should not replace professional care.',
}

export const tomorrowPrediction = {
  mood: 'Happy',
  confidence: '82%',
  reasoning:
    'The prediction agent found that your Sunday mood score, recent sleep quality, and lower stress trend align with historically positive next-day outcomes.',
}

export const wellnessRecommendations = [
  'Walk 15 minutes',
  'Sleep before 11 PM',
  'Reduce Instagram by 20 mins',
  'Maintain current routine',
]

export const agentReports = [
  {
    agent: 'Mood Agent',
    status: 'Positive momentum',
    output: 'Mood score is elevated with frequent positive sentiment markers and higher-than-average energy cues.',
  },
  {
    agent: 'Stress Agent',
    status: 'Moderate load',
    output: 'Stress remains manageable but is sensitive to screen-time spikes and context switching in the afternoon.',
  },
  {
    agent: 'Depression Agent',
    status: 'Low risk',
    output: 'Protective indicators outweigh risk signals today, especially sleep stability and activity consistency.',
  },
  {
    agent: 'Prediction Agent',
    status: 'Happy likely',
    output: 'Tomorrow is predicted to remain positive with 82% confidence based on weekly trend alignment.',
  },
  {
    agent: 'Wellness Coach Agent',
    status: 'Maintain routine',
    output: 'Continue the current routine, add a brief walk, and reduce evening scrolling to preserve momentum.',
  },
]
