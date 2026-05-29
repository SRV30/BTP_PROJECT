const mongoose = require('mongoose')
const { env } = require('../utils/env')

const connectDB = async () => {
  if (!env.MONGO_URI) {
    console.warn('MONGO_URI is not set. Skipping MongoDB connection.')
    return null
  }

  mongoose.set('strictQuery', true)

  const connection = await mongoose.connect(env.MONGO_URI)
  console.log(`MongoDB connected: ${connection.connection.host}`)

  return connection
}

module.exports = { connectDB }
