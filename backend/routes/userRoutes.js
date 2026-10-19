const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middleware/requireAuth')
const upload = require('../middleware/upload')
const {loginUser, signupUser, uploadProfilePicture, deleteProfilePicture} = require('../controllers/userController')

const router = express.Router()


router.post('/login', loginUser)
router.post('/signup', signupUser)

router.patch('/profile-picture', requireAuth, upload.single('profilePicture'), uploadProfilePicture)
router.delete('/profile-picture', requireAuth, deleteProfilePicture)

module.exports = router