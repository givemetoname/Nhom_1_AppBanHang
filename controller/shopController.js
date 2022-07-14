const Product = require('../models/Product')
const helper = require('../helpers/hbs')

class shopController {

    async shop(req, res, next) { // hàm để render ra trang shop
        try {
            res.render('shop', { activer: 'shop' }) // trả về view với tên shop
        } catch (error) {
            console.log(error);
        }

    }

 
 
 }

module.exports = new shopController()