const { expect } = require('chai')
const { stub } = require('sinon')
const log = require('../logger')

// Assert
describe('server', () => {
  it('should listen', () => {
    // Arrange
    const app = require('../app')
    const listenStub = stub(app, 'listen')
    const logInfoStub = stub(log, 'info')
    // Act
    require('../server')
    // Assert
    expect(listenStub.called).equals(true)

    // Callback function of listen(), should log info
    const callback = listenStub.firstCall.args[1]
    callback()
    expect(logInfoStub.called).equals(true)

    // Restore
    listenStub.restore()
    logInfoStub.restore()
  })
})
