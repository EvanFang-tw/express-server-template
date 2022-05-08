// const log4js = require('./lib/configuare')()
const log4js = require('log4js')
const path = require('path')
const utils = require('../lib/utils')

const env = utils.getNodeEnv(process.env.NODE_ENV)
const configPath = path.join(__dirname, 'config', `log4js.${env}.json`)

log4js.configure(configPath)

/**
 * Get logger, set level if process.env.LOG_LEVEL is set
 * @param {string} msg
 * @param {string} [catagory]
 */
function getLogger (catagory) {
  const logger = log4js.getLogger(catagory)
  if (process.env.LOG_LEVEL) {
    logger.level = process.env.LOG_LEVEL
  }
  return logger
}

module.exports = {
  //
  getLogger,
  /**
   * Log debug message
   * @param {string} msg
   * @param {string} [catagory]
   */
  debug: (msg, catagory) => {
    const logger = getLogger(catagory)
    logger.debug(msg)
  },
  /**
   * Log information
   * @param {string} msg
   * @param {string} [catagory]
   */
  info: (msg, catagory) => {
    const logger = getLogger(catagory)
    logger.info(msg)
  },
  /**
   * Log warning
   * @param {string} msg
   * @param {string} [catagory]
   */
  warn: (msg, catagory) => {
    const logger = getLogger(catagory)
    logger.warn(msg)
  },
  /**
   * Log error
   * @param {string} msg
   * @param {string} [catagory]
   */
  error: (msg, catagory) => {
    const logger = getLogger(catagory)
    logger.error(msg)
  },
  /**
   * Log fatal error
   * @param {string} msg
   * @param {string} [catagory]
   */
  fatal: (msg, catagory) => {
    const logger = log4js.getLogger(catagory)
    logger.fatal(msg)
  },
  //
  // Express middleware for recording http requests
  requestLogger: () => {
    const logger = log4js.getLogger('http')
    return log4js.connectLogger(logger, {
      level: 'auto',
      format: (req, res, format) => {
        return format(`:remote-addr - ${req.id} - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"} ${JSON.stringify(req.body)}`)
      },
      nolog: '\\.(gif|jpe?g|png)$'
    })
  }
}
