const mongoose = require('mongoose')

const getHealth = (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'moodsense-backend',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
}

module.exports = { getHealth }
