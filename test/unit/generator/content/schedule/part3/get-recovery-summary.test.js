const toCurrencyString = require('../../../../../../app/generator/to-currency-string')
const getRecoverySummary = require('../../../../../../app/generator/content/schedule/part3/get-recovery-summary')
const { recoverySchedule } = require('../../../../../mocks/mock-schedule')

describe('Get recovery summary', () => {
  test('should return "The table below shows your revised quarterly payments.\n\n" for key stack 1 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[0]).toBe('The table below shows your revised quarterly payments.\n\n')
  })

  test('should use solid line style for grid', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].layout.hLineStyle()).toBe('solid')
    expect(result.stack[1].layout.vLineStyle()).toBe('solid')
  })

  test('should return "Current agreement value: recoverySchedule.adjustment.currentValue\n" for key stack 2 line 1` entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0].stack[0]).toBe(`Current agreement value: ${toCurrencyString(recoverySchedule.adjustment.currentValue)}\n`)
  })

  test('should return "New agreement value: recoverySchedule.adjustment.newValue\n" for key stack 2 line 2 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0].stack[1]).toBe(`New agreement value: ${toCurrencyString(recoverySchedule.adjustment.newValue)}\n`)
  })

  test('should return "Reduction: recoverySchedule.adjustment.adjustmentValue" for key stack 2 line 3 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0].stack[2]).toBe(`Reduction: ${toCurrencyString(String(Math.abs(recoverySchedule.adjustment.adjustmentValue)))}`)
  })

  test('should return "Remaining Balance: recoverySchedule.remainingAmount" for key stack 2 line 4 entry', () => {
    const result = getRecoverySummary(recoverySchedule)
    expect(result.stack[1].table.body[0][0].stack[3]).toBe(`Remaining balance: ${toCurrencyString(String(Math.abs(recoverySchedule.remainingAmount)))}`)
  })
})
