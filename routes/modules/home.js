const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getDate } = require('../../public/javascript/functions')

router.get('/', (req, res) => {
  Promise.all([Record.find().lean().sort('-date'), Category.find().lean()])
    .then(results => {
      const [records, categories] = results
      const amounts = records.map(record => record.amount)
      const totalAmount = amounts.reduce((sum, current) => sum + current, 0)

      records.forEach(record => {
        const category = categories.find(category => category.name === record.category)
        record.icon = category.icon
        record.date = getDate(record.date)
      })
      res.render('index', { records, totalAmount })
    }).catch(err => console.log(err))
})

module.exports = router