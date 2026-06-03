const getCurrentTimeSlot = (date = new Date()) => {
  const currentDate = new Date(date)
  const hour = Number.isNaN(currentDate.getTime()) ? new Date().getHours() : currentDate.getHours()

  if (hour >= 0 && hour < 8) {
    return 'MORNING'
  }

  if (hour >= 8 && hour < 16) {
    return 'AFTERNOON'
  }

  return 'EVENING'
}

module.exports = { getCurrentTimeSlot }
