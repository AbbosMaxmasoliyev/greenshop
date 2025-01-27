const mongoose = require('mongoose')

const app = require('./server')


const MONGO_URL =
  process.env.NODE_ENV === 'production'
    ? 'mongodb://otajonmaxmasoliyev775:gFjQguufGrbS8zoL@undefined/?replicaSet=atlas-q0t0fp-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority'
    : 'mongodb://localhost:27017/greenshop'

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
