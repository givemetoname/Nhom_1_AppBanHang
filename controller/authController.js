
class authController{
    //@desc Google auth callback
    //@route GET/ auth/google/callback
        googleAuthCallback(req, res){
            res.redirect('/dashboard')
        }

        //@desc Google auth callback
//@router/auth/logout

       authLogout(req, res){
        req.logOut()
        res.redirect('/')
       }
   
}

module.exports = new authController()