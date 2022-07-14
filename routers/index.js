
const loginRouter = require('./loginAndRequest')
const authRouter = require('./auth')
const homeRouter =require('./homeRouter')
const cartRouter = require('./cartRouter')
const shopRouter = require('./shopRouter')
const oderRouter = require('./oderRouter')
const myProductRouter = require('./myProductRouter')

function route(app) { // app là app của express
app.use('/', homeRouter) // trang home
app.use('/', shopRouter) // trang shop
app.use('/pages',cartRouter) // trang giỏ hàng
app.use('/pages',oderRouter) // trang đặt hàng 
app.use('/pages',homeRouter) // trang chi tiết sản phẩm
app.use('/pages',myProductRouter) // trang chi tiết sản phẩm
app.use('/auth', authRouter)    // trang đăng nhập
app.use('/', loginRouter)   // trang đăng nhập

}

module.exports = route; // trả về router