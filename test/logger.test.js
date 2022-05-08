const logger = require('../logger')
const log4js = require('log4js')
const { stub, spy } = require('sinon')
const { expect } = require('chai')

// Use sinon-chai
require('chai').use(require('sinon-chai'))

describe('loggers', () => {
  // Arrage
  const fakeLogger = {
    debug: spy(),
    info: spy(),
    warn: spy(),
    error: spy(),
    fatal: spy()
  }

  /**
   * Stub log4js.getLogger to return a fake logger
   * @type {sinon.SinonStub}
   */
  let getLoggerStub
  beforeEach(() => {
    getLoggerStub = stub(log4js, 'getLogger').returns(fakeLogger)
  })
  afterEach(() => {
    if (getLoggerStub) getLoggerStub.restore()
  })
  //
  describe('debug', () => {
    it('should call log4js.debug', () => {
      // Act
      logger.debug('message', 'catagory')
      // Assert
      expect(getLoggerStub).calledWith('catagory')
      expect(fakeLogger.debug).calledWith('message')
    })
  })
  //
  describe('info', () => {
    it('should call log4js.info', () => {
      // Act
      logger.info('message', 'catagory')
      // Assert
      expect(getLoggerStub).calledWith('catagory')
      expect(fakeLogger.info).calledWith('message')
    })
  })
  //
  describe('warn', () => {
    it('should call log4js.warn', () => {
      // Act
      logger.warn('message', 'catagory')
      // Assert
      expect(getLoggerStub).calledWith('catagory')
      expect(fakeLogger.warn).calledWith('message')
    })
  })
  //
  describe('error', () => {
    it('should call log4js.error', () => {
      // Act
      logger.error('message', 'catagory')
      // Assert
      expect(getLoggerStub).calledWith('catagory')
      expect(fakeLogger.error).calledWith('message')
    })
  })
  //
  describe('fatal', () => {
    it('should call log4js.fatal', () => {
      // Act
      logger.fatal('message', 'catagory')
      // Assert
      expect(getLoggerStub).calledWith('catagory')
      expect(fakeLogger.fatal).calledWith('message')
    })
  })
  //
  describe('process.env.LOG_LEVEL', () => {
    it('should change logger level', () => {
      // Arrange
      process.env.LOG_LEVEL = 'INFO'
      // Act
      const log = logger.getLogger()
      // Assert
      expect(log.level).equals(log4js.levels.INFO.levelStr)
      // Restore
      process.env.LOG_LEVEL = ''
    })
  })
})
