const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth') // middleware
const myProduct = require('../controller/myProductController')


router.get('/myProduct', ensureAuth, myProduct.myProduct)  // trang sản phẩm của user')


router.get('/myProduct/createProduct', ensureAuth, myProduct.renderCreateProduct)  // trang tạo sản phẩm

router.get('/myProduct/editProduct/:idProduct', ensureAuth, myProduct.renderEditProduct)  // trang sửa sản phẩm


router.post('/myProduct/addProduct', ensureAuth, myProduct.addProduct)   // thêm sản phẩm

router.put('/myProduct/editedProduct/:idProduct', ensureAuth, myProduct.editedProduct)  // trang sửa sản phẩm

router.delete('/myProduct/deletedProduct/:idProduct', ensureAuth, myProduct.deletedProduct)  // trang sửa sản phẩm



module.exports = router