const { millimetresToPoints } = require('../../../app/generator/conversion')

describe('millimetresToPoints', () => {
  test('converts millimetres to points', () => {
    const result = millimetresToPoints(50)
    expect(result).toBe(141.75)
  })
})
