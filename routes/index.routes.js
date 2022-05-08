const express = require('express')
const router = express.Router()
const controller = require('../controllers/index.controller')

router.get('/', controller.getIndex)
router.get('/healthz', controller.healthCheck)
router.get('/error', controller.getError)

module.exports = router
