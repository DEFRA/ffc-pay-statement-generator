const part3 = require('../../../../app/generator/content/part3')
const mockStatement = require('../../../mocks/statement-data')

describe('generate part 3', () => {
  test('includes header', () => {
    const result = part3(mockStatement)
    expect(result[0].text).toBe('Part 3. More support')
  })
})
