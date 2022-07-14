
const Product = require('../models/Product')

const ShowSessionCart = require('../models/sessionCart')
const Cart = require('../models/Cart')
const Oder = require('../models/Oder')
const sessionCart = require('../models/sessionCart')

class cartController {
    // hàm này để render sản phẩm  giỏ hàng
  async cart(req, res, next) {
    try {
      if (req.hasOwnProperty('user')) { //nếu đã đăng nhập
        const cart = await Cart.find({ BuynerUser: req.user._id }) // tìm giỏ hàng theo id user 
        if (cart != null) {   // nếu giỏ hàng không rỗng
          res.render('pages/cart', { 
            products: cart, // truyền giỏ hàng vào trang cart
            activer: 'pages', // truyền active vào trang cart
          })
        } else {
          res.render('pages/cart') // nếu giỏ hàng rỗng thì truyền trang cart
        }
      } else {
        const showSessionCart = await ShowSessionCart.find() // tìm giỏ hàng theo seassionId
        res.render('pages/cart', { activer: 'pages', products: showSessionCart }) // truyền giỏ hàng vào trang cart
      }

    } catch (error) {
      console.log(error);
    }


  }

  //hàm này để xóa sản phẩm trong giỏ hàng
  async deleteProductInCart(req, res, next) { 
    try {
      if (req.hasOwnProperty('user')) { // nếu đã đăng nhập
        const id = req.params.idProduct // lấy id sản phẩm
        const product = await Cart.deleteOne({ _id: id }) // xóa sản phẩm theo id
        res.redirect('/pages/cart')
      }else{
        const id = req.params.idProduct // lấy id sản phẩm
        const product = await ShowSessionCart.deleteOne({ _id: id }) // xóa sản phẩm theo id
        res.redirect('/pages/cart') 
      }
      
    } catch (error) {
      console.log(error);
    }
  }

    //hàm này để sửa số lượng trong giỏ hàng
  async editCount(req, res, next) {
    try {
      if (req.hasOwnProperty('user')) { // nếu đã đăng nhập
        await Cart.updateOne({ _id: req.body.idOfProduct.trim()} ,{ // sửa số lượng theo id
          $set: { // cập nhật số lượng
            count: req.body.count // số lượng mới
          }
        })
        res.send('data') // trả về thông báo
      }else{ // nếu chưa đăng nhập

        await sessionCart.updateOne({ _id: req.body.idOfProduct.trim() },{  // sửa số lượng theo id
          $set: { // cập nhật số lượng
            count: req.body.count // số lượng mới
          }
        })
        res.send('data')
      }
       
    } catch (error) {
      console.log(error);
    }
  }

  async paid(req, res, next) {
    try {
        const cart = await Cart.find({ BuynerUser: req.user._id }) // tìm giỏ hàng theo id user
        const order = new Oder({ // tạo đơn hàng
          user: req.user._id, // id user
          products: cart,  // sản phẩm
          totalPrice: req.body.totalPrice  // tổng tiền

        })
        order.save() // lưu đơn hàng

        await Cart.deleteMany({ BuynerUser: req.user._id }) // xóa giỏ hàng

        res.redirect('/pages/oder') // chuyển sang trang đơn hàng
    } catch (error) {
      console.log(error);
    }
  }



}
module.exports = new cartController()