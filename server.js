require('dotenv').config()

const app = require('./app')
const log = require('./logger')

// Get port
const port = process.env.PORT
if (!port) {
  log.error('process.env.PORT is empty')
  throw new Error('process.env.PORT is empty')
}

// Check if need https
const needHttps = (process.env.HTTPS_ENABLED === 'true')
log.info(`https enabled: ${needHttps}`, 'server')

// Create server
const getServer = require('./lib/getServer')
const server = getServer(app, needHttps)
server.listen(port, () => {
  log.info(`app on ${port}`, 'server')
})
