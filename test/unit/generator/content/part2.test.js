const part2 = require('../../../../app/generator/content/part2')
const mockStatement = require('../../../mock-statement-data')

describe('generate part 2', () => {
  test('includes header', () => {
    const result = part2(mockStatement)
    expect(result[0].text).toBe('Part 2. Calculation')
  })
})
