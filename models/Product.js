const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    sellerName: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
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
    review:[
       { idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }}
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Product', ProductSchema)

