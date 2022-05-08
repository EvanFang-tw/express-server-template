/**
 * @param {Object} [message]
 * @param {Number} [statusCode]
 * @param {Error} [err]
 */
function createError (message, statusCode, err) {
  const error = err || new Error()
  if (message) {
    error.message = message
  }
  error.statusCode = statusCode || 500
  return error
}

module.exports = createError
