const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getDate } = require('../../public/javascript/functions')

router.get('/', (req, res) => {
  const { filteredCategory } = req.query
  const userId = req.user._id
  let query = ''
  if (filteredCategory === undefined || filteredCategory === "") {
    query = { userId }
  } else {
    query = { category: filteredCategory, userId }
    Category.find({ name: filteredCategory })
      .then(result => {
        if (result.length === 0) {
          return res.render('index', { filterError: '找不到所選類別，請重新選擇!' })
        }
      })
  }

  Promise.all([Record.find(query).lean().sort('-date'), Category.find().lean()])
    .then(results => {
      const [records, categories] = results
      const amounts = records.map(record => record.amount)
      const totalAmount = amounts.reduce((sum, current) => sum + current, 0)

      records.forEach(record => {
        const category = categories.find(category => category.name === record.category)
        record.icon = category.icon
        record.date = getDate(record.date)
      })
      res.render('index', { records, totalAmount, filteredCategory })
    }).catch(err => console.log(err))
})

module.exports = router