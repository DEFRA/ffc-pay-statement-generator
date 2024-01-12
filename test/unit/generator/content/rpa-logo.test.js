const summary = require('../../../../app/generator/content/rpa-logo')
const mockStatement = require('../../../mocks/mock-statement')

describe('generate summary', () => {
  test('includes RPA logo', () => {
    const result = summary(mockStatement)
    expect(result.stack[0].image.endsWith('v2/rpa-logo.png')).toBeTruthy()
  })

  test('logo style is set to logo', () => {
    const result = summary(mockStatement)
    expect(result.stack[0].style).toBe('logo')
  })
})
