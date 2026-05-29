const User = require('../models/User')

const getProfile = (req, res) => {
  res.status(200).json({ user: req.user.toJSON() })
}

const updateProfile = async (req, res, next) => {
  try {
    const allowedUpdates = ['name', 'avatar']
    const updates = allowedUpdates.reduce((profileUpdates, field) => {
      if (req.body[field] !== undefined) {
        return { ...profileUpdates, [field]: req.body[field] }
      }

      return profileUpdates
    }, {})

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Provide name or avatar to update' })
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    })

    return res.status(200).json({ user: user.toJSON() })
  } catch (error) {
    return next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' })
    }

    const user = await User.findById(req.user._id).select('+password')

    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()

    return res.status(200).json({
      message: 'Password changed successfully',
      user: user.toJSON(),
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  changePassword,
  getProfile,
  updateProfile,
}
