const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log(`mongoose error!`)
})

db.once('open', () => {
  console.log(`mongoose connected!`)
})

module.exports = db