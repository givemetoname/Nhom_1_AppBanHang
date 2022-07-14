const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const homeController = require('../controller/homeController')


// @desc    Login/Landing page
// @route   GET /Trang home
router.get('/', homeController.home)  // trang home

router.get('/home/news/:countPages', homeController.home)   // trang home có số trang

router.get('/productDetails/:idProduct', homeController.productDetails)  // trang chi tiết sản phẩm

router.get('/add-to-cart/:idProduct', homeController.addTocart)  // thêm sản phẩm vào giỏ hàng





module.exports = router