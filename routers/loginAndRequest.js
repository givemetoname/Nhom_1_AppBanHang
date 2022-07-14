const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const loginController = require('../controller/loginController')



// @route   GET / trang login
router.get('/login',ensureGuest,loginController.login) 
// @route   GET / trang đăng ký
router.get('/resgiter', ensureGuest, loginController.resgiter)

// @route   post / tạo tài khoản
router.post('/createUser', loginController.createUser)

// @route   post / request lên sever để đăng nhập
router.post('/requestLogin', loginController.requestLogin)



module.exports = router