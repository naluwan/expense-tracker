const { validationResult } = require('express-validator')
const { getDate } = require('../public/javascript/functions')

const checkEditValid = (req, res, next) => {

  const { name, category, amount } = req.body
  const date = getDate(req.body.date)
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).render('edit', {
      errs: errors.array(),
      record: { name, category, date, amount }
    })
  }
  next()
}

module.exports = checkEditValid