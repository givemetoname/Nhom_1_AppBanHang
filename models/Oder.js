const mongoose = require('mongoose')

const OderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    products:[
        {
            idProduct: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            BuynerUser: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
            },
            sellerName:{
                type: String,
            },
            type: {
                type: String,
                default: 'traicay',
                enum: ['traicay', 'rau', 'khac']
            },
            nameFuitl: {
                type: String,
                required: true
            },
            count: {
                type: String,
                required: true
            },
            image: {
                type: String
            },
            price: {
                type: String,
            },
        }
    ],
    totalPrice:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
})

module.exports = mongoose.model('Oder', OderSchema)