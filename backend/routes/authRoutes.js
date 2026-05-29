const express = require('express')
const { getCurrentUser, login, logout, signup } = require('../controllers/authController')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', authMiddleware, logout)
router.get('/me', authMiddleware, getCurrentUser)

module.exports = router
