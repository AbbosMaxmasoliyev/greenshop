const mongoose = require('mongoose')

const app = require('./server')

const MONGO_URL =
  process.env.NODE_ENV === 'production'
    ? 'mongodb+srv://Ikromov:O2wteU4Tx9ZYLFnT@books.qkcfe.mongodb.net/?retryWrites=true&w=majority&appName=Books'
    : 'mongodb://127.0.0.1:27017/greenshop'

const PORT = process.env.PORT || 3000

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB ulanishi muvaffaqiyatli amalga oshirildi')
    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishlamoqda`)
    })
  })
  .catch(err => console.error('MongoDB ulanishida xatolik yuz berdi:', err))
