const mongoose = require('mongoose')

const sessionCartSchema = new mongoose.Schema({
        idProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        sessionId: {
            type: String,
        },
        type: {
            type: String,
            default: 'traicay',
            enum: ['traicay', 'rau', 'khac']
        },
        nameFuitl: {
            type: String,
        },
        count: {
            type: String,
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

module.exports = mongoose.model('sessionCart', sessionCartSchema)