const app = require('./app')
const { connectDB } = require('./config/db')
const { env } = require('./utils/env')

const startServer = async () => {
  await connectDB()

  app.listen(env.PORT, () => {
    console.log(`MoodSense API listening on port ${env.PORT}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start MoodSense API:', error.message)
  process.exit(1)
})
