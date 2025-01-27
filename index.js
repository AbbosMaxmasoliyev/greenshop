const express = require('express')
const mongoose = require('mongoose')

const app = require('./server')
const port = 3000

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/greenshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})
