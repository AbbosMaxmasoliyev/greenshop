const express = require('express')
const cors = require('cors')

// server.js
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/api/flowers', require('./routes/flower'))
app.use('/api/orders', require('./routes/order'))
module.exports = app
