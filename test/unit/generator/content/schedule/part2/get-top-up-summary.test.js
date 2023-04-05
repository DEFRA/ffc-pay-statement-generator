const getTopUpSummary = require('../../../../../../app/generator/content/schedule/part2/get-top-up-summary')

const mockAdjustment = {
  currentValue: '1000.00',
  newValue: '1200.00',
  adjustmentValue: '200.00'
}

describe('Get top up summary', () => {
  test('include current agreement line', () => {
    const result = getTopUpSummary(mockAdjustment)
    expect(result.table.body[0][0].stack[0]).toEqual('\nCurrent agreement value: £1,000.00\n')
  })

  test('includes new agreement line', () => {
    const result = getTopUpSummary(mockAdjustment)
    expect(result.table.body[0][0].stack[1]).toEqual('New agreement value: £1,200.00\n')
  })

  test('includes Top up amount line', () => {
    const result = getTopUpSummary(mockAdjustment)
    expect(result.table.body[0][0].stack[2]).toEqual('Top up amount: £200.00')
  })
})
