const part1 = require('../../../../app/generator/content/part1')
const mockStatement = require('../../../mocks/statement-data')

describe('generate part 1', () => {
  test('includes header', () => {
    const result = part1(mockStatement)
    expect(result.stack[0].text).toBe('Part 1. Payment summary')
  })
})
