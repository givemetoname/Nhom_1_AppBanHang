const Product = require('../models/Product')
const functionn = require('../function/function');
const Cart = require('../models/Cart');
const User = require('../models/User');
const sessionCart = require('../models/sessionCart');



class homeController {
    //hàm này để render trang home
    async home(req, res, next) {
        try {
            let perPage = 6; // số lượng sản phẩm xuất hiện trên 1 page
            let page = req.params.countPages || 1
            const Products = await Product
                .find()
                .skip((perPage * page) - perPage)// số lượng sản phẩm bỏ qua
                .limit(perPage)    // số lượng sản phẩm xuất hiện trên 1 page
                .exec((err, product) => { // hàm này để tìm tổng số sản phẩm
                    Product.countDocuments((err, count) => { // đếm để tính xem có bao nhiêu trang
                        if (err) return next(err);    // nếu có lỗi thì trả về lỗi
                        res.render('home', { // nếu không có lỗi thì render trang home
                            activer: 'home', // để thêm text vào vào class của thẻ a
                            Products: product, // truyền sản phẩm vào trang home
                            current: page, // truyền số trang hiện tại
                            pages: Math.ceil(count / perPage) // tính tổng số trang
                        })

                    })

                })
                

            const SessionCart = await sessionCart.find({ sessionId: req.signedCookies.sessionId }) // tìm giỏ hàng theo id user
            if (req.hasOwnProperty('user')&&SessionCart.length>0) { // nếu đăng nhập và có giỏ hàng
                SessionCart.forEach( async element => { // duyệt từng giỏ hàng
                    if (element.sessionId == req.signedCookies.sessionId) { // nếu giỏ hàng có id session được đăng nhập
                        const cart = new Cart({ // tạo mới giỏ hàng
                            idProduct: element.id, // id sản phẩm
                            BuynerUser: req.user._id, // id user
                            sellerName: element.sellerName, // tên người bán
                            count: element.count,   // số lượng
                            price: element.price, // giá
                            nameFuitl: element.nameFuitl, // tên sản phẩm
                            image: element.image, // ảnh sản phẩm
                            type: element.type // loại sản phẩm
                        })
                        cart.save(); // lưu giỏ hàng vào database

                       const test= await sessionCart.deleteMany({ sessionId: req.signedCookies.sessionId })  // xóa giỏ hàng trong session 
                    } 
                }
            )}
        }

        catch (error) {
            console.log(error);
        }

    }

        
    // hàm này để render ra trang chi tiết sản phẩm
    async productDetails(req, res, next) {
        try {
            const id = req.params.idProduct; // lấy id sản phẩm
            const product = await Product.findOne({ _id: id }) // tìm sản phẩm theo id
            res.render('pages/productDetails', { // render trang chi tiết sản phẩm
                product: product // truyền sản phẩm vào trang chi tiết sản phẩm
            })

        } catch (error) {
            console.log(error);
        }
    }
    

    // hàm này là để thêm vào giỏ hàng
    async addTocart(req, res, next) {
        try {
            const id = req.params.idProduct // lấy id sản phẩm
            const product = await Product.findById(id)  // tìm sản phẩm theo id'
            const Session_Cart = await sessionCart.findOne({ idProduct: id })  // tìm giỏ hàng theo id sản phẩm
            let cart = null // khởi tạo giỏ hàng

            if (req.hasOwnProperty('user')) { // nếu đăng nhập
                 cart = await Cart.findOne({ idProduct: id}) // tìm giỏ hàng theo id user
            }
            
            if (req.user==null) { // nếu chưa đăng nhập
                if (Session_Cart != null) { // nếu giỏ hàng có sản phẩm
                    Session_Cart.count = Number(Session_Cart.count) + 1; // tăng số lượng giỏ hàng lên 1
                    Session_Cart.save(); // lưu giỏ hàng vào database
                    res.redirect('/');
                } else { // nếu giỏ hàng không có sản phẩm
                    const cart = new sessionCart({  // tạo mới giỏ hàng
                        idProduct: id,
                        sessionId: req.signedCookies.sessionId,
                        sellerName: product.sellerName,
                        count: 1,
                        price: product.price,
                        nameFuitl: product.nameFuitl,
                        image: product.image,
                        type: product.type
                    }) 
                    cart.save(); // lưu giỏ hàng vào database
                    res.redirect('/');
                }
            }else{ // nếu đăng nhập
                if (cart!=null) { // nếu giỏ hàng có sản phẩm
                    cart.count = Number(cart.count) + 1; // tăng số lượng giỏ hàng lên 1
                    cart.save(); // lưu giỏ hàng vào database
                    res.redirect('/');
                }else{ // nếu giỏ hàng không có sản phẩm
                    const cart = new Cart({ // tạo mới giỏ hàng
                        idProduct: id,
                        BuynerUser: req.user._id,
                        sellerName: product.sellerName,
                        count: 1,
                        price: product.price,
                        nameFuitl: product.nameFuitl,
                        image: product.image,
                        type: product.type
                    })
                    cart.save(); // lưu giỏ hàng vào database
                    res.redirect('/');
                }
                    
            }
        } catch (error) {
            console.log(error);
        }


    }

}

module.exports = new homeController()