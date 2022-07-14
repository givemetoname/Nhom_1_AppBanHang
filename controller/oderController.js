
const Oder = require('../models/Oder')
class oderController {

    async oder(req, res, next) { //hàm để render ra trang đặt hàng
        try {
            const id = req.user._id // lấy id của user đang đăng nhập
            const oder = await Oder.find({ user: id }) // lấy tất cả các đơn hàng của user

            res.render('pages/oder', { activer: 'pages' ,oders:oder})
        } catch (error) {
            console.log(error);
        }

    }


    async oderDetails(req, res, next) { //hàm để render ra trang chi tiết đặt hàng
        try {
            const oder = await Oder.findById({ _id: req.params.idOder.trim() }) // lấy đơn hàng cần xem bằng id
            res.render('pages/oderDetails', { activer: 'pages', oder:oder }) // trả về view với đơn hàng cần xem
        } catch (error) {
            console.log(error);
        }
    }
 
 
 }

module.exports = new oderController()