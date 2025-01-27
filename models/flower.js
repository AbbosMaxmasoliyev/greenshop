const mongoose = require('mongoose')

const flowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  image: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: false
  },
  sku: {
    type: String,
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  size: {
    type: [Number],
    required: true
  },
  tags: {
    type: [String],
    required: false
  },
  rating: {
    type: Number,
    required: false
  }
})

const Flower = mongoose.model('Flower', flowerSchema)

module.exports = Flower
