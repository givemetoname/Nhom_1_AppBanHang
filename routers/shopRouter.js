const express = require('express')
const router = express.Router()
const shopController = require('../controller/shopController')

router.get('/shop', shopController.shop) // trang shop




module.exports = router