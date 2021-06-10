const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getDate } = require('../../public/javascript/functions')

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

router.get('/filter', (req, res) => {
  const { filteredCategory } = req.query

  Promise.all([Record.find({ category: { $regex: filteredCategory } }).lean().sort('-date'), Category.find().lean()])
    .then(results => {
      const [filteredRecords, categories] = results
      const amounts = filteredRecords.map(filteredRecord => filteredRecord.amount)
      const totalAmount = amounts.reduce((sum, current) => sum + current, 0)

      filteredRecords.forEach(record => {
        const category = categories.find(category => category.name === record.category)
        record.icon = category.icon
        record.date = getDate(record.date)
      })
      res.render('index', { records: filteredRecords, totalAmount, filteredCategory })
    }).catch(err => console.log(err))
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

router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router