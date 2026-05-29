const express = require('express')
const {
  forgotPassword,
  getCurrentUser,
  login,
  logout,
  resetPassword,
  signup,
} = require('../controllers/authController')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', authMiddleware, logout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get('/me', authMiddleware, getCurrentUser)

module.exports = router
