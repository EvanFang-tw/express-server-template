const express = require('express') // eslint-disable-line 
const utils = require('../lib/utils')
const createError = require('../lib/createError')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
*/
function getIndex (req, res, next) {
  res.status(200).send(req.id)
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
*/
function healthCheck (req, res) {
  const result = utils.getHealthCheckResult()
  res.status(200).send({
    time: result.serverTime.toString(),
    version: result.serverVersion
  })
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
*/
function getError (req, res, next) {
  return next(createError('error example', 400))
}

module.exports = {
  getIndex,
  healthCheck,
  getError
}
