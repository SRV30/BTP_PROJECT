import { useMemo } from 'react'
import { getMoodOverview } from '../services/moodService'

export const useMoodOverview = () => useMemo(() => getMoodOverview(), [])
