const express = require('express')
const passport = require('passport')
const router = express.Router()
const authController = require('../controller/authController')


// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] })  )

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/' }),authController.googleAuthCallback)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', authController.authLogout)

module.exports = router