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

router.put('/:id', (req, res) => {
  const id = req.params.id
  const newRecord = req.body

  return Record.findById(id)
    .then(record => {
      record.name = newRecord.name
      record.category = newRecord.category
      record.date = newRecord.date
      record.amount = newRecord.amount
      return record.save()
    }).then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router