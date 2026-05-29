const User = require('../models/User')
const { generateToken } = require('../services/tokenService')

const buildAuthResponse = (user, token) => ({
  token,
  user: user.toJSON(),
})

const signup = async (req, res, next) => {
  try {
    const { avatar = '', email, name, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' })
    }

    const user = await User.create({
      avatar,
      email: normalizedEmail,
      name,
      password,
    })
    const token = generateToken(user._id)

    return res.status(201).json(buildAuthResponse(user, token))
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email is already registered' })
    }

    return next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password')

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = generateToken(user._id)

    return res.status(200).json(buildAuthResponse(user, token))
  } catch (error) {
    return next(error)
  }
}

const logout = (_req, res) => {
  res.status(200).json({ message: 'Logged out successfully' })
}

const getCurrentUser = (req, res) => {
  res.status(200).json({ user: req.user.toJSON() })
}

module.exports = {
  getCurrentUser,
  login,
  logout,
  signup,
}
