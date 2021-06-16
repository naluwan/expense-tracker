const { validationResult } = require('express-validator')
const { getDate } = require('../public/javascript/functions')

const checkEditValid = (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).render('index', { editErrorMessages: errors.array() })
  }
  next()
}

module.exports = checkEditValid