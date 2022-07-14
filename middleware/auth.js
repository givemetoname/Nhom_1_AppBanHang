const shortId = require('shortid')
module.exports = {
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }else{
            res.redirect('/login')
        }
    },

    ensureGuest: function(req, res, next){
        if(req.isAuthenticated()){
            res.redirect('/')
        }else{
            return next()
        }
    },

    cartSession: function(req, res, next){ //session cart
        if (!req.signedCookies.sessionId) { //nếu không có sessionId
            res.cookie('sessionId',shortId.generate(), { signed: true }) // tạo sessionId
        }
        next() // chuyển tiếp
    }
}