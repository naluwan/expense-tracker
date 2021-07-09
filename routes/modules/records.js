const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { getDate } = require('../../public/javascript/functions')
const { check } = require('express-validator')
const checkCreateValid = require('../../modules/checkCreateValid')
const checkEditValid = require('../../modules/checkEditValid')
const mongoose = require('mongoose')

router.get('/new', (req, res) => {
  const today = getDate(Date.now())
  res.render('new', { defaultDate: today })
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      record.date = getDate(record.date)
      res.render('edit', { record })
    })
    .catch(err => console.log(err))
})

router.post('/', [
  check('name').trim().isLength({ min: 1 }).withMessage('名稱不可為空白，請重新輸入!'),
  check('date').isISO8601().toDate().withMessage('請照格式選擇日期!'),
  check('category').trim().isLength({ min: 1 }).withMessage('請選擇支出類別'),
  check('amount').isInt({ allow_leading_zeroes: false, min: 1 }).withMessage('支出金額有誤，請重新輸入!')
], checkCreateValid, (req, res) => {
  const { name, category, date, amount } = req.body
  const userId = req.user._id
  const defaultDate = getDate(date)

  Category.find({ name: category })
    .lean()
    .then(result => {
      if (result.length === 0) {
        return res.render('new', { errorMsg: '找不到所選類別，請重新選擇!', record: { name, category, amount }, defaultDate })
      }

      return Record.create({
        name,
        category,
        date,
        amount,
        userId
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

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
  const userId = req.user._id
  const _id = req.params.id
  const newRecord = req.body
  const { name, date, category, amount } = req.body
  date = getDate(date)

  Category.find({ name: newRecord.category })
    .lean()
    .then(result => {
      if (result.length === 0) {
        return res.render('edit', { errorMsg: '找不到所選類別，請重新選擇!', record: { name, date, category, amount } })
      } else {
        return Record.findOne({ _id, userId })
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
  const userId = req.user._id
  const _id = req.params.id

  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router