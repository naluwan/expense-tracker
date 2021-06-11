const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')



app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})