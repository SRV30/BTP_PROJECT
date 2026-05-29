const User = require('../models/User')
const { verifyToken } = require('../services/tokenService')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authentication token is required' })
  }

  try {
    const decoded = verifyToken(token)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: 'User account no longer exists' })
    }

    req.user = user
    return next()
  } catch (_error) {
    return res.status(401).json({ message: 'Invalid or expired authentication token' })
  }
}

module.exports = { authMiddleware }
