const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const recordList = require('./seed.json').recordSeeds

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '123456',
    records: recordList.slice(0, 3)
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '123456',
    records: recordList.slice(3, 5)
  }
]


db.once('open', () => {
  return Promise.all(SEED_USER.map(async (SEED_USER) => {
    const { name, email, password, records } = SEED_USER
    await bcrypt
      .genSalt(10)
      .then(salt => { return bcrypt.hash(password, salt) })
      .then(hash => { return User.create({ name, email, password: hash }) })
      .then(user => {
        return Promise.all(records.map(record => {
          const { name, category, date, amount, merchant } = record
          const userId = user._id
          return Record.create({ name, category, date, amount, merchant, userId })
        }))
      })
  })).then(() => {
    console.log('recordSeeder done!')
    process.exit()
  })
})