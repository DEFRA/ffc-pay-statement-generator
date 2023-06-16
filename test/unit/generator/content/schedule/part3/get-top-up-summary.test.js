const getTopUpSummary = require('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')

const mockAdjustment = {
  currentValue: '1000.00',
  newValue: '1200.00',
  adjustmentValue: '200.00'
}

describe('Get top-up summary', () => {
  test('should return "The table below shows your revised payments." for key stack 6 entry', () => {
    const result = getTopUpSummary(mockAdjustment)
    expect(result.stack[0]).toBe('The table below shows your revised payments.\n\n')
  })

  test('should use solid line style for grid', () => {
    const result = getTopUpSummary(mockAdjustment)
    expect(result.stack[1].layout.hLineStyle()).toBe('solid')
    expect(result.stack[1].layout.vLineStyle()).toBe('solid')
  })

  test('should return "Current agreement value: £1,000.00\n" for key stack 2 line 1` entry', () => {
    const result = getTopUpSummary(mockAdjustment)
    expect(result.stack[1].table.body[0][0].stack[0]).toEqual('Current agreement value: £1,000.00\n')
  })

  test('should return "New agreement value: £1,200.00\n" for key stack 2 line 2 entry', () => {
    const result = getTopUpSummary(mockAdjustment)
    expect(result.stack[1].table.body[0][0].stack[1]).toEqual('New agreement value: £1,200.00\n')
  })

  test('should return "Top up amount: £200.00\n" for key stack 2 line 3 entry', () => {
    const result = getTopUpSummary(mockAdjustment)
    expect(result.stack[1].table.body[0][0].stack[2]).toEqual('Top up amount: £200.00\n')
  })
})
