const controller = require('../controllers/index.controller')
const { expect } = require('chai')
const { mockReq, mockRes } = require('sinon-express-mock')

// Use sinon-chai
require('chai').use(require('sinon-chai'))

describe('index controller', () => {
  it('should do healthCheck() as expected', () => {
    // Arrange
    const req = mockReq()
    const res = mockRes()
    // Act
    controller.healthCheck(req, res)
    // Assert
    expect(res.status).calledWith(200)
  })
})
