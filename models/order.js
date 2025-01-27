const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    billingAddress: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        countryRegion: {
            type: String,
            required: true
        },
        townCity: {
            type: String,
            required: true
        },
        streetAddress: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        notes: {
            type: String
        }
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['credit card', 'paypal', 'cash']
    },
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Flower',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    orderTotal: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
