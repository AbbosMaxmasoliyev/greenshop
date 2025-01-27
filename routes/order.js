const express = require('express')
const { body, validationResult } = require('express-validator')
const Order = require('../models/order')

const router = express.Router()
router.use(express.json())

// Middleware: Request body validation for Order
const validateOrder = [
  body('customerName').notEmpty().withMessage('Customer name is required'),
  body('customerEmail').isEmail().withMessage('Valid email is required'),
  body('billingAddress.firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('billingAddress.lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  body('billingAddress.countryRegion')
    .notEmpty()
    .withMessage('Country/Region is required'),
  body('billingAddress.townCity')
    .notEmpty()
    .withMessage('Town/City is required'),
  body('billingAddress.streetAddress')
    .notEmpty()
    .withMessage('Street address is required'),
  body('billingAddress.state').notEmpty().withMessage('State is required'),
  body('billingAddress.zip').notEmpty().withMessage('ZIP code is required'),
  body('billingAddress.emailAddress')
    .isEmail()
    .withMessage('Valid email is required'),
  body('billingAddress.phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required'),
  body('paymentMethod')
    .isIn(['credit card', 'paypal', 'cash'])
    .withMessage('Invalid payment method'),
  body('orderItems')
    .isArray({ min: 1 })
    .withMessage('Order items must be an array with at least one item'),
  body('orderItems.*.productId')
    .notEmpty()
    .withMessage('Product ID is required for each item'),
  body('orderItems.*.quantity')
    .isInt({ gt: 0 })
    .withMessage('Quantity must be a positive integer for each item'),
  body('orderTotal').isNumeric().withMessage('Order total must be a number'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

// CRUD operations for Order
// Create: Yangi buyurtma qo'shish
router.post('/', validateOrder, async (req, res) => {
  try {
    const order = new Order(req.body)
    const savedOrder = await order.save()
    res.status(201).json(savedOrder)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Read: Barcha buyurtmalarni olish
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    const filter = {}

    if (startDate || endDate) {
      filter.orderDate = {}
      if (startDate) filter.orderDate.$gte = new Date(startDate)
      if (endDate) filter.orderDate.$lte = new Date(endDate)
    }

    const orders = await Order.find(filter).populate('orderItems.productId')
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Read: ID bo'yicha buyurtmani olish
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'orderItems.productId'
    )
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update: ID bo'yicha buyurtmani yangilash
router.put('/:id', validateOrder, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete: ID bo'yicha buyurtmani o'chirish
router.delete('/orders/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id)
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json({ message: 'Order deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
