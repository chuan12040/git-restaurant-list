// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
const restaruantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaruants: restaruantList.results })

})

app.get('/restaruants/:restaruant_id', (req, res) => {
  const restaurant = restaruantList.results.find(restaruant => restaruant.id.toString() === req.params.restaruant_id)
  res.render('show', { restaruant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaruants = restaruantList.results.filter(restaruant => {
    return restaruant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaruants: restaruants, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})