const express = require('express')
const Flower = require('../models/flower') // Flower modelini import qilish
const { body, validationResult } = require('express-validator')

const router = express.Router()

const validateFlower = [
  body('name').notEmpty().withMessage('Name is required'),
  body('color').notEmpty().withMessage('Color is required'),
  body('image').isArray().withMessage('Image must be an array'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('sku').notEmpty().withMessage('SKU is required'),
  body('category').isArray().withMessage('Category must be an array'),
  body('size').isArray().withMessage('Size must be an array'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

// Search flowers
router.get('/search', async (req, res) => {
  try {
    const { name, color } = req.query
    const filters = {}

    if (name) filters.name = new RegExp(name, 'i') // Case-insensitive qidirish
    if (color) filters.color = new RegExp(color, 'i')

    const flowers = await Flower.find(filters)

    res.status(200).json(flowers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Advanced: Narx bo'yicha filtrlash va saralash
router.get('/filter', async (req, res) => {
  try {
    const { minPrice, maxPrice, sortBy, size } = req.query
    const filters = {}
    // Narx bo'yicha filtrlash
    if (minPrice || maxPrice) {
      filters.price = {}
      if (minPrice) filters.price.$gte = parseFloat(minPrice) // Qiymatni son tipiga o'girish
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice)
    }

    // O'lcham bo'yicha filtrlash
    if (size) {
      filters.size = size // O'lchamni to'g'ridan-to'g'ri qo'shish
    }

    const flowers = await Flower.find(filters).sort(sortBy) // Narx bo'yicha saralash

    res.status(200).json(flowers)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})
// Create: Yangi gul qo'shish
router.post('/', validateFlower, async (req, res) => {
  try {
    const flower = new Flower(req.body)
    const savedFlower = await flower.save()
    res.status(201).json(savedFlower)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Read: Barcha gullarni olish
router.get('/', async (req, res) => {
  try {
    const flowers = await Flower.find()
    res.status(200).json(flowers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Read: ID bo'yicha gulni olish
router.get('/:id', async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id)
    if (!flower) {
      return res.status(404).json({ message: 'Flower not found' })
    }
    res.status(200).json(flower)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update: ID bo'yicha gulni yangilash
router.put('/:id', validateFlower, async (req, res) => {
  try {
    const updatedFlower = await Flower.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    if (!updatedFlower) {
      return res.status(404).json({ message: 'Flower not found' })
    }
    res.status(200).json(updatedFlower)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete: ID bo'yicha gulni o'chirish
router.delete('/:id', async (req, res) => {
  try {
    const deletedFlower = await Flower.findByIdAndDelete(req.params.id)
    if (!deletedFlower) {
      return res.status(404).json({ message: 'Flower not found' })
    }
    res.status(200).json({ message: 'Flower deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
