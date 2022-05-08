const app = require('../app')
const time = require('../lib/time')
const request = require('supertest')
const { expect } = require('chai')
const { stub } = require('sinon')
const utils = require('../lib/utils')
const log = require('../logger')

describe('GET /', () => {
  it('should success', () => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) throw err
      })
  })
})

describe('GET /healthz', () => {
  it('should success', () => {
    // Arrange
    const now = new Date()
    const nowStub = stub(time, 'now').returns(now)

    // Act
    request(app)
      .get('/healthz')
      .expect(200)
      .end((err, res) => {
        //
        // Assert
        expect(res.body).deep.equals({
          time: now.toString(),
          version: '1.0'
        })
        //
        // Restore
        nowStub.restore()

        if (err) throw err
      })
  })
})

describe('GET /notfound', () => {
  it('should return 404 not found', () => {
    // Act
    request(app)
      .get('/notfound')
      .expect(404)
      .end((err, res) => {
        // Assert
        expect(res.text).equals('not found')
        if (err) throw err
      })
  })
})

describe('Default error handler', () => {
  it('should work as expected', () => {
    // Arrange
    const timeStub = stub(utils, 'getHealthCheckResult').throws(new Error('oops'))
    const logErrorStub = stub(log, 'error')
    //
    // Act (Simuate an error occurs when calling /healthz)
    request(app)
      .get('/healthz')
      .expect(500)
      .end((err, res) => {
        // Assert
        expect(res.text).equals('oops')
        // Error message should be logged
        expect(logErrorStub).calledWith('oops', 'app')
        if (err) throw err
        // Restore
        timeStub.restore()
        logErrorStub.restore()
      })
  })
})

describe('X-Frame-Options', () => {
  it('should be set to DENY to prevent "clickjacking" attack', () => {
    //
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) throw err
        //
        expect(res.headers['x-frame-options']).equals('DENY')
      })
  })
})
