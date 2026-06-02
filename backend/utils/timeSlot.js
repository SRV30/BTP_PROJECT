const getCurrentTimeSlot = (date = new Date()) => {
  const currentDate = new Date(date)
  const hour = Number.isNaN(currentDate.getTime()) ? new Date().getHours() : currentDate.getHours()

  if (hour >= 5 && hour < 12) {
    return 'MORNING'
  }

  if (hour >= 12 && hour < 17) {
    return 'AFTERNOON'
  }

  if (hour >= 17 && hour < 21) {
    return 'EVENING'
  }

  return 'NIGHT'
}

module.exports = { getCurrentTimeSlot }
