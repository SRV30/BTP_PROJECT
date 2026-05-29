const crypto = require('crypto')
const User = require('../models/User')
const { generateToken } = require('../services/tokenService')

const normalizeEmail = (email) => email.toLowerCase().trim()

const sendTokenResponse = (res, statusCode, user) => {
  const token = generateToken(user._id)

  return res.status(statusCode).json({
    token,
    user: user.toJSON(),
  })
}

const signup = async (req, res, next) => {
  try {
    const { avatar = '', email, name, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const normalizedEmail = normalizeEmail(email)
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

    return sendTokenResponse(res, 201, user)
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

    const user = await User.findOne({ email: normalizeEmail(email) }).select('+password')

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    return sendTokenResponse(res, 200, user)
  } catch (error) {
    return next(error)
  }
}

const logout = (_req, res) => {
  res.status(200).json({ message: 'Logged out successfully' })
}

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const user = await User.findOne({ email: normalizeEmail(email) })

    if (!user) {
      return res.status(404).json({ message: 'No user found with that email address' })
    }

    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    return res.status(200).json({
      message: 'Password reset token generated. Email delivery is not configured yet.',
      resetToken,
      resetPasswordExpire: user.resetPasswordExpire,
    })
  } catch (error) {
    return next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body

    if (!password) {
      return res.status(400).json({ message: 'New password is required' })
    }

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select('+password +resetPasswordToken +resetPasswordExpire')

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' })
    }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    return sendTokenResponse(res, 200, user)
  } catch (error) {
    return next(error)
  }
}

const getCurrentUser = (req, res) => {
  res.status(200).json({ user: req.user.toJSON() })
}

module.exports = {
  forgotPassword,
  getCurrentUser,
  login,
  logout,
  resetPassword,
  signup,
}
