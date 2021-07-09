const { validationResult } = require('express-validator')
const { getDate } = require('../public/javascript/functions')

const checkCreateValid = (req, res, next) => {

  const { name, category, amount } = req.body
  const date = getDate(req.body.date)
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).render('new', {
      errs: errors.array(),
      record: { name, category, amount },
      defaultDate: date
    })
  }
  next()
}

module.exports = checkCreateValid