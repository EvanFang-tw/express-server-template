require('../typedef')
const { now } = require('./time')

/**
 * @returns {HealthCheckResult}
 */
function getHealthCheckResult () {
  /** @type {HealthCheckResult} */
  const result = {
    serverTime: now(),
    serverVersion: '1.0'
  }
  return result
}

/**
 * Return NODE_ENV value, e.g. 'dev', 'test', 'prod'. Default is 'dev'.
 * @param {string} nodeEnv - You need to pass process.env.NODE_ENV to this parameter
 */
function getNodeEnv (nodeEnv) {
  if (!nodeEnv) return 'dev'
  return nodeEnv.trim().toLocaleLowerCase()
}

module.exports = {
  getHealthCheckResult,
  getNodeEnv
}
