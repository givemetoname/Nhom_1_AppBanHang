const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const cartController = require('../controller/cartController')

router.get('/cart',cartController.cart) // trang giỏ hàng

router.get('/delete-product-in-cart/:idProduct',cartController.deleteProductInCart) // xóa sản phẩm trong giỏ hàng

router.post('/editCountInCart',cartController.editCount) // sửa số lượng trong giỏ hàng

router.post('/cart/paid',ensureAuth, cartController.paid) // thêm sản phẩm vào giỏ hàng


module.exports = router