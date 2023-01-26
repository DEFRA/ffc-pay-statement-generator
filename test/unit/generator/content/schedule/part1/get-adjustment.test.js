const { getAdjustment } = require('../../../../../../app/generator/content/schedule/part1/get-adjustment')

describe('get adjustment', () => {
  test('should return current agreement value', () => {
    const result = getAdjustment({
      currentValue: 100,
      newValue: 200,
      adjustmentValue: 100
    })
    expect(result[0]).toBe('Current agreement value: 100\n')
  })

  test('should return new agreement value', () => {
    const result = getAdjustment({
      currentValue: 100,
      newValue: 200,
      adjustmentValue: 100
    })
    expect(result[1]).toBe('New agreement value: 200\n')
  })

  test('should return top up amount', () => {
    const result = getAdjustment({
      currentValue: 100,
      newValue: 200,
      adjustmentValue: 100
    })
    expect(result[2]).toBe('Top up amount: 100')
  })

  test('should return reduction amount', () => {
    const result = getAdjustment({
      currentValue: 200,
      newValue: 100,
      adjustmentValue: -100
    })
    expect(result[2]).toBe('Reduction amount: -100')
  })
})
