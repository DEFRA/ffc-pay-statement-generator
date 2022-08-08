const summary = require('../../../../app/generator/content/summary')
const mockStatement = require('../../../mock-statement-data')

describe('generate summary', () => {
  test('includes header', () => {
    const result = summary(mockStatement)
    expect(result.stack[0].text).toBe('Sustainable Farming Incentive 2022')
  })

  test('includes subtitle', () => {
    const result = summary(mockStatement)
    expect(result.stack[1].text).toBe('Payment statement')
  })
})
