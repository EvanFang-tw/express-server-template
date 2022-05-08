const utils = require('../lib/utils')
const { expect } = require('chai')

describe('utils.getNodeEnv()', () => {
  it('should return "test" while unit testing', () => {
    // Act
    const env = utils.getNodeEnv(process.env.NODE_ENV)
    // Assert
    expect(env).equals('test')
  })
  //
  it('should return "dev" when NODE_ENV is empty', () => {
    // Act & Assert
    expect(utils.getNodeEnv(undefined)).equals('dev')
    expect(utils.getNodeEnv(null)).equals('dev')
    expect(utils.getNodeEnv('')).equals('dev')
  })
})
