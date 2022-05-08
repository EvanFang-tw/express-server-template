const http = require('http')
const https = require('https')
const fs = require('fs')
const log = require('../logger')
/**
 * get http or https server
 * @param {Express.Application} app
 * @param {boolean} isHttps
 */
function getServer (app, isHttps) {
  //
  if (!isHttps) {
    return http.createServer(app)
  }
  // create https server
  const certPath = process.env.HTTPS_CERT_PATH
  const keyPath = process.env.HTTPS_KEY_PATH
  //
  if (!certPath || !fs.existsSync(certPath)) {
    const err = 'process.env.HTTPS_CERT_PATH is empty or file does not exist'
    log.error(err, 'lib/getServer.js')
    throw new Error(err)
  }
  if (!keyPath || !fs.existsSync(keyPath)) {
    const err = 'process.env.HTTPS_KEY_PATH is empty or file does not exist'
    log.error(err, 'lib/getServer.js')
    throw new Error('process.env.HTTPS_KEY_PATH is empty or file does not exist')
  }
  //
  const cert = fs.readFileSync(certPath)
  const key = fs.readFileSync(keyPath)
  //
  return https.createServer({ cert, key }, app)
}

module.exports = getServer
