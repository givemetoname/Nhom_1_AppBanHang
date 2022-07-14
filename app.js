const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const db = require('./config/db')
const morgan = require('morgan')
const methodOverride = require('method-override')
const route = require('./routers');
const passport = require('passport')
const session = require('express-session')
const cookiePaser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const cartSession = require('./middleware/auth')


db.connect()

// Load config
dotenv.config({path:'./config/config.env'})
//passport config
require('./config/passport')(passport)

const app = express()

//Body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookiePaser('secret'))
app.use(cartSession.cartSession)
// Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method 
        delete req.body._method
        return method
      }
    })
  )
  
//loggin
if(process.env.NODE_ENV === 'development'){s
        app.use(morgan('dev'))
}
  
//ejs Helper
const {formatDate,stripTags,truncate, editIcon,select,likedd,indexOfliked,test} = require('./helpers/hbs')


//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    cookie: {maxAge: 180 * 60 * 1000}
  }))

  

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//connect flash 
app.use(flash())


//Global vars
app.use((req, res, next)=>{
  res.locals.check = req.hasOwnProperty('user')
  res.locals.user = req.user||null
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.activer = req.flash('activer')
  res.locals.stripTags = stripTags
  res.locals.truncate = truncate
  res.locals.pages = req.flash('pages')
  next()
})

//Static folder 
app.use(express.static(path.join(__dirname, 'public')))

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('layout','layout/layout.ejs')
//router
route(app)  

const PORT = process.env.PORT|| 4000


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
