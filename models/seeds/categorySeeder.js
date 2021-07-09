if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const { categorySeeds } = require('./seed.json')

db.once('open', () => {
  Category.create(categorySeeds)
    .then(() => {
      console.log('category seed done!')
      process.exit()
    })
})