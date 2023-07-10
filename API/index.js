//index.js
//Import Express
require('dotenv').config()
let express = require('express')
//Start App
let app = express()
var cors = require('cors')
let apiRoutes = require('./routes')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const log4js = require('log4js')
log4js.configure({
  appenders: { risk: { type: 'file', filename: 'risk.log' } },
  categories: { default: { appenders: ['risk'], level: 'error' } }
})
const logger = log4js.getLogger('risk')
require('./config/passport')
global.__basedir = __dirname
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

app.use('/api', apiRoutes)
app.use(function (err, req, res, next) {
  console.log(err.name)
  if (err.name === 'UnauthorizedError') {
    res.status(401)
    res.json({ message: err.name + ': ' + err.message })
  } else next(err)
})
const dbPath = 'mongodb://0.0.0.0:27017/risk_playground'
// const client = new MongoClient('mongodb://0.0.0.0:27017/risk_playground/questions')
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongo = mongoose.connect(dbPath, options)
mongo.then(
  () => {
    console.log('connected')
  },
  error => {
    console.log(error, 'error')
  }
)
//Assign port
var port = process.env.PORT || 8080
// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'))
// Launch app to the specified port
app.listen(port, function () {
  console.log('Running FirstRest on Port ' + port)
})
