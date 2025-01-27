const request = require('supertest')
const app = require('../server')
const mongoose = require('mongoose')
const Flower = require('../models/flower')
const Order = require('../models/order')

describe('Flower Routes', () => {
  let flowerId

  before(async () => {
    await mongoose
      .connect('mongodb://localhost:27017/greenshop_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('Connected to MongoDB'))
      .catch(error => console.error(error))
  })

  after(async () => {
    await mongoose.connection.close()
  })

  it('should create a new flower', async () => {
    const response = await request(app)
      .post('/api/flowers')
      .send({
        name: 'Rose',
        color: 'Red',
        image: ['image1.jpg'],
        price: 10,
        sku: 'R123',
        category: ['Garden'],
        size: [40, 50]
      })
    console.log(response)
    expect(response.statusCode).equal(201)
    expect(response.body.name).toBe('Rose')
    flowerId = response.body._id
  })

  it('should get all flowers', async () => {
    const response = await request(app).get('/api/flowers')
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it('should get a flower by ID', async () => {
    const response = await request(app).get(`/api/flowers/${flowerId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBe(flowerId)
  })

  it('should update a flower by ID', async () => {
    const response = await request(app)
      .put(`/api/flowers/${flowerId}`)
      .send({ price: 15 })
    expect(response.statusCode).toBe(200)
    expect(response.body.price).toBe(15)
  })

  it('should delete a flower by ID', async () => {
    const response = await request(app).delete(`/api/flowers/${flowerId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Flower deleted successfully')
  })
})

describe('Order Routes', () => {
  let orderId

  it('should create a new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        billingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          countryRegion: 'USA',
          townCity: 'New York',
          streetAddress: '123 Main St',
          state: 'NY',
          zip: '10001',
          emailAddress: 'john@example.com',
          phoneNumber: '1234567890'
        },
        paymentMethod: 'credit card',
        orderItems: [{ productId: mongoose.Types.ObjectId(), quantity: 1 }],
        orderTotal: 100
      })
    expect(response.statusCode).toBe(201)
    expect(response.body.customerName).toBe('John Doe')
    orderId = response.body._id
  })

  it('should get all orders', async () => {
    const response = await request(app).get('/api/orders')
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it('should get an order by ID', async () => {
    const response = await request(app).get(`/api/orders/${orderId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBe(orderId)
  })

  it('should update an order by ID', async () => {
    const response = await request(app)
      .put(`/api/orders/${orderId}`)
      .send({ orderTotal: 150 })
    expect(response.statusCode).toBe(200)
    expect(response.body.orderTotal).toBe(150)
  })

  it('should delete an order by ID', async () => {
    const response = await request(app).delete(`/api/orders/${orderId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Order deleted successfully')
  })
})
