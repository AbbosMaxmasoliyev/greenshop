const mongoose = require('mongoose')

const app = require('./server')

const MONGO_URL =
  process.env.NODE_ENV === 'production'
    ? 'mongodb://localhost:27017/greenshop'
    : 'mongodb+srv://abbos:jn7nCxBBue1vU0tj@cluster0.adosdaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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
