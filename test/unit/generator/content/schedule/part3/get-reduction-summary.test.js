const getReductionSummary = require('../../../../../../app/generator/content/schedule/part3/get-reduction-summary')
const { reductionSchedule } = require('../../../../../mocks/mock-schedule')

describe('Get reduction summary', () => {
  test('should return "The table below shows your revised quarterly payments.\n\n" for key stack 1 entry', () => {
    const result = getReductionSummary(reductionSchedule)
    expect(result.stack[0]).toBe('The table below shows your revised quarterly payments.\n\n')
  })

  test('should use solid line style for grid', () => {
    const result = getReductionSummary(reductionSchedule)
    expect(result.stack[1].layout.hLineStyle()).toBe('solid')
    expect(result.stack[1].layout.vLineStyle()).toBe('solid')
  })

  test('should return "Current agreement value: £1,000.00\n" for key stack 2 line 1` entry', () => {
    const result = getReductionSummary(reductionSchedule)
    expect(result.stack[1].table.body[0][0].stack[0]).toBe('Current agreement value: £1,000.00\n')
  })

  test('should return "New agreement value: £700.00\n" for key stack 2 line 2 entry', () => {
    const result = getReductionSummary(reductionSchedule)
    expect(result.stack[1].table.body[0][0].stack[1]).toBe('New agreement value: £700.00\n')
  })

  test('should return "Reduction: £300.00" for key stack 2 line 3 entry', () => {
    const result = getReductionSummary(reductionSchedule)
    expect(result.stack[1].table.body[0][0].stack[2]).toBe('Reduction: £300.00')
  })

  test('should return "Remaining Balance: £200.00" for key stack 2 line 4 entry', () => {
    const result = getReductionSummary(reductionSchedule)
    expect(result.stack[1].table.body[0][0].stack[3]).toBe('Remaining balance: £200.01')
  })
})
