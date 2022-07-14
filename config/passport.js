const GoogleStrately = require ('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User =require('../models/User')
 const User2 =require('../models/User2')
 const bcrypt = require('bcryptjs')

module.exports = function(passport){
    passport.use(new GoogleStrately({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'/auth/google/callback'

    }, async(accessToken, refreshToken, profile, done)=>{
            const newUser= {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }

            try {
                let user = await User.findOne({googleId:profile.id})
                
                if (user) {
                    done(null, user)
                }else{
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch (err) {
                console.log(err);
            }
    }))
 
   passport.use(
        new LocalStrategy({ usernameField: 'email'},(email, password, done)=>{
                //Match User
         User2.findOne({email:email})
                .then(user=>{
                    if (!user) {
                        return done(null, false, {message:'Email này chưa hợp lệ hoặc đã được đăng ký'})
                    }
                    //Match password
                    bcrypt.compare(password, user.password,(err, isMatch)=>{
                        

                        if (isMatch) {
                            return done(null , user)
                        }else{
                            return done(null, false, {message: 'Mật khẩu chưa chính xác'})  
                        }
                    })
                })
                .catch(err=>console.log(err))
        })
      
    ) 

   
    passport.serializeUser((user, done) =>{
        done(null, user.id)
    })

    passport.deserializeUser((id, done) =>{
        User.findById(id, function(err,user){
            done(err, user)
        })

        passport.deserializeUser((id, done) =>{
            User2.findById(id, function(err,user){
                done(err, user)
            })})
})}

