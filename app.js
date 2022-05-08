const { requestLogger } = require('./logger')
const bodyParser = require('body-parser')
const express = require('express')
const log = require('./logger')
const helmet = require('helmet')

const app = express()

// Hide powerby from response header
// app.use(helmet.hidePoweredBy())
// Add X-Frame-Options: DENY to response header
app.use(helmet.frameguard({ action: 'deny' }))

// Use uuid request ID
app.use(require('express-request-id')())

// Use body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Log all requests
app.use(requestLogger())

// Routes
app.use('/', require('./routes/index.routes'))

// 404 Handler
app.use((req, res, next) => {
  res.status(404).send('not found')
})

// Default error handler
app.use((err, req, res, next) => {
  log.error(err.message, 'app')
  res.status(err.statusCode || 500).send(err.message)
})

module.exports = app
