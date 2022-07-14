const Product = require('../models/Product')

class myProductController {

    async myProduct(req, res, next) {  // hàm render ra trang myProduct
        try {  
            const id = req.user._id  // lấy id của user đang đăng nhập
            const product = await Product.find({ user: id })   // lấy tất cả các sản phẩm của user
            res.render('pages/myProduct', { activer: 'pages' ,products: product}) // trả về view với các sản phẩm của user
        } catch (error) {
            console.log(error);
        }

    }

    async renderCreateProduct(req, res, next) {  //hàm để render thêm sản phẩm
        try { 
            res.render('CURD/createProduct', { activer: 'pages' }) 
        } catch (error) {
            console.log(error);
        }
    }

    async renderEditProduct(req, res, next) { //hàm để render ra trang sửa sản phẩm
        try {
            const product = await Product.findOne({ _id: req.params.idProduct.trim() })  // lấy sản phẩm cần sửa
            res.render('CURD/editProduct', { activer: 'pages', product:product }) 
        } catch (error) {
            console.log(error);
        }
    }


    async addProduct(req, res, next) { //hàm để thêm sản phẩm
        try {  // tạo mới sản phẩm
            const product = new Product({
                sellerName: req.body.sellerName, // lấy tên người bán
                price: req.body.price, // lấy giá
                nameFuitl: req.body.nameFuitl,
                count: req.body.count,
                image: req.body.image,
                description: req.body.description,
                type: req.body.type,
                user: req.user._id,
            })
            await product.save() // lưu sản phẩm vào database
            res.redirect('/pages/myProduct') // trả về trang myProduct
        } catch (error) {
            console.log(error);
        }
    }


    async editedProduct(req, res, next) { //hàm để sửa sản phẩm
        try {
            await Product.findOneAndUpdate({ _id: req.params.idProduct.trim() }, { // lấy sản phẩm cần sửa
                sellerName: req.body.sellerName, // lấy tên người bán
                price: req.body.price,
                nameFuitl: req.body.nameFuitl,
                count: req.body.count,
                image: req.body.image,
                description: req.body.description,
                type: req.body.type,
                user: req.user._id,
            })
            res.redirect('/pages/myProduct')
        } catch (error) {
            console.log(error);
        }
    }


    async deletedProduct(req, res, next) { //hàm để xóa sản phẩm
        try { 
            await Product.findOneAndDelete({ _id: req.params.idProduct.trim() }) // lấy sản phẩm cần xóa
            res.redirect('/pages/myProduct') // trả về trang myProduct
        } catch (error) {
            console.log(error);
        }
    }

 
 
 }

module.exports = new myProductController()