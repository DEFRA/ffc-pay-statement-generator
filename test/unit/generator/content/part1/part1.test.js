const part1 = require('../../../../../app/generator/content/part1')
const mockStatement = require('../../../../mocks/statement-data')

describe('generate part 1', () => {
  test('includes header', () => {
    const result = part1(mockStatement)
    expect(result.stack[0].text).toBe('Part 1. Payment summary')
  })

  test('includes header style', () => {
    const result = part1(mockStatement)
    expect(result.stack[0].style).toBe('header2')
  })

  test('includes table with a single row', () => {
    const result = part1(mockStatement)
    expect(result.stack[1].table.body.length).toBe(1)
  })

  test('includes table with a single column', () => {
    const result = part1(mockStatement)
    expect(result.stack[1].table.body[0].length).toBe(1)
  })

  test('includes table cell with background colour', () => {
    const result = part1(mockStatement)
    expect(result.stack[1].table.body[0][0].fillColor).toBe('#d9d9d9')
  })

  test('includes payment schedule', () => {
    const result = part1(mockStatement)
    expect(result.stack[1].table.body[0][0].stack[0].text).toBe('Your quarterly SFI payment for July to October 2022 is £242.15')
  })

  test('includes payment date', () => {
    const result = part1(mockStatement)
    expect(result.stack[1].table.body[0][0].stack[1]).toMatch('\nWe will pay this into your account on 1 July 2022.\n')
  })

  test('includes calculation date title', () => {
    const result = part1(mockStatement)
    expect(result.stack[1].table.body[0][0].stack[2].columns[0].text).toBe('Calculation date:')
  })

  test('includes calculation date value', () => {
    const result = part1(mockStatement)
    expect(result.stack[1].table.body[0][0].stack[2].columns[1].text).toBe('16 June 2022')
  })

  test('includes reference title', () => {
    const result = part1(mockStatement)
    expect(result.stack[1].table.body[0][0].stack[3].columns[0].text).toBe('Payment reference number:')
  })

  test('includes reference value', () => {
    const result = part1(mockStatement)
    expect(result.stack[1].table.body[0][0].stack[3].columns[1].text).toBe('PY1234567')
  })
})
