const express = require('express')
const { changePassword, getProfile, updateProfile } = require('../controllers/profileController')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.get('/profile', getProfile)
router.put('/profile', updateProfile)
router.put('/change-password', changePassword)

module.exports = router
