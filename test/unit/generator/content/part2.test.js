const part2 = require('../../../../app/generator/content/part2')
const mockStatement = require('../../../mock-statement-data')

describe('generate part 2', () => {
  test('includes header', () => {
    const result = part2(mockStatement)
    expect(result[0].text).toBe('Part 2. Calculation')
  })

  test('includes introduction with scheme short name', () => {
    const result = part2(mockStatement)
    expect(result[1].text).toBe(`We calculated the total ${mockStatement.scheme.shortName} payment amount by adding together payments for all the standards which are part of your agreement, as shown in this table.`)
  })

  test('includes all table columns', () => {
    const result = part2(mockStatement)
    expect(result[2].table.body.length).toBe(6)
  })

  test('includes all table columns', () => {
    const result = part2(mockStatement)
    expect(result[2].table.body[0].length).toBe(8)
  })

  test('includes all table rows', () => {
    const result = part2(mockStatement)
    expect(result[2].table.body.length).toBe(6)
  })

  test('includes all help text lines', () => {
    const result = part2(mockStatement)
    expect(result[3].text.length).toBe(3)
  })

  test('includes help text introduction', () => {
    const result = part2(mockStatement)
    expect(result[3].text[0]).toBe('You can check which land parcels are part of each standard in the Rural Payments service at ')
  })

  test('includes help text link', () => {
    const result = part2(mockStatement)
    expect(result[3].text[1].link).toBe('https://www.gov.uk/claim-rural-payments')
    expect(result[3].text[1].style).toBe('link')
  })

  test('includes help text full stop', () => {
    const result = part2(mockStatement)
    expect(result[3].text[2]).toBe('.')
  })
})
