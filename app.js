const express = require('express')
const hbs = require('express-handlebars')
const routes = require('./routes')
const app = express()
const PORT = 3000

app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

require('./config/mongoose')

app.use(express.static('public'))
app.use(routes)


app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})