const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body
  Record.create({
    name,
    category,
    date,
    amount
  }).then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router