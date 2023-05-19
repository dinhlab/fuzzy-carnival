const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')

const app = express()

require('dotenv').config()
const cors = require('cors')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', indexRouter)

// catch when when request match no route
app.use((req, res, next) => {
  const exception = new Error('Path not found')
  exception.statusCode = 404
  next(exception)
})

// customize express error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode).send(err.message)
})

module.exports = app
