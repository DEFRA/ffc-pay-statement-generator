const { getAdjustment } = require('../../../../../../app/generator/content/schedule/part1/get-adjustment')

let adjustment

describe('get adjustment', () => {
  beforeEach(() => {
    adjustment = {
      currentValue: 100,
      newValue: 200,
      adjustmentValue: 100
    }
  })

  test('should return current agreement value', () => {
    const result = getAdjustment(adjustment)
    expect(result[0]).toBe('Current agreement value: 100\n')
  })

  test('should return new agreement value', () => {
    const result = getAdjustment(adjustment)
    expect(result[1]).toBe('New agreement value: 200\n')
  })

  test('should return top up amount', () => {
    const result = getAdjustment(adjustment)
    expect(result[2]).toBe('Top up amount: 100')
  })

  test('should return reduction amount', () => {
    adjustment.adjustmentValue = -100
    const result = getAdjustment(adjustment)
    expect(result[2]).toBe('Reduction amount: -100')
  })
})
