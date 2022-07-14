const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
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
    description: {
        type: String,
    },
    image: {
        type: String
    },
    price: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Cart', CartSchema)