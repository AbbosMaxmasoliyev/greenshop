const express = require('express')
const mongoose = require('mongoose')

const app = require('./server')
const port = 3000
const MONGO_URL =
  process.env.NODE_ENV === 'production'
    ? 'mongodb://otajonmaxmasoliyev775:gFjQguufGrbS8zoL@undefined/?replicaSet=atlas-q0t0fp-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority'
    : 'mongodb://localhost:27017/greenshop'
// MongoDB connection
mongoose.connect(MONGO_URL, {
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
