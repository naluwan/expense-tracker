const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getDate } = require('../../public/javascript/functions')
const { check } = require('express-validator')
const checkCreateValid = require('../../modules/checkCreateValid')
const checkEditValid = require('../../modules/checkEditValid')
const mongoose = require('mongoose')

router.post('/', [
  check('name').trim().isLength({ min: 1 }).withMessage('名稱不可為空白，請重新輸入!'),
  check('date').isISO8601().toDate().withMessage('請照格式選擇日期!'),
  check('category').trim().isLength({ min: 1 }).withMessage('請選擇支出類別'),
  check('amount').isInt({ allow_leading_zeroes: false, min: 1 }).withMessage('支出金額有誤，請重新輸入!')
], checkCreateValid, (req, res) => {
  const { name, category, date, amount } = req.body

  Category.find({ name: category })
    .lean()
    .then(result => {
      if (result.length === 0) {
        return res.render('index', { createCategoryError: '找不到所選類別，請重新選擇!' })
      } else {
        Record.create({
          name,
          category,
          date,
          amount
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    }).catch(err => console.log(err))
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

router.put('/:id', [
  check('name').trim().isLength({ min: 1 }).withMessage('名稱不可為空白，請重新輸入!'),
  check('date').isISO8601().toDate().withMessage('請照格式選擇日期!'),
  check('category').trim().isLength({ min: 1 }).withMessage('請選擇支出類別'),
  check('amount').isInt({ allow_leading_zeroes: false, min: 1 }).withMessage('支出金額有誤，請重新輸入!'),
  check('id').custom((value, { req }) => {
    if (!mongoose.Types.ObjectId.isValid(`${value.toString()}`)) {
      throw new Error('id格式有問題!!')
    }
    return true
  })
], checkEditValid, (req, res) => {
  const id = req.params.id
  const newRecord = req.body

  Category.find({ name: newRecord.category })
    .lean()
    .then(result => {
      if (result.length === 0) {
        return res.render('index', { editCategoryError: '找不到所選類別，請重新選擇' })
      } else {
        return Record.findById(id)
          .then(record => {
            record.name = newRecord.name
            record.category = newRecord.category
            record.date = newRecord.date
            record.amount = newRecord.amount
            return record.save()
          }).then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    }).catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router