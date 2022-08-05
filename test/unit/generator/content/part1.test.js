const part1 = require('../../../../app/generator/content/part1')
const mockStatement = require('../../../mock-statement-data')

describe('generate part 1', () => {
  test('includes header', () => {
    const result = part1(mockStatement)
    expect(result[0].text).toBe('Part 1. Payment summary')
  })
})
