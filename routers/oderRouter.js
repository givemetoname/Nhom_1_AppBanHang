const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth') // middleware
const oderController = require('../controller/oderController')

router.get('/oder', ensureAuth,oderController.oder) // trang giỏ hàng

router.get('/oder/:idOder', ensureAuth, oderController.oderDetails) // trang chi tiết  giỏ hàng



module.exports = router