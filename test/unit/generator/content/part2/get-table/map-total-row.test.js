const mapTotalRow = require('../../../../../../app/generator/content/part2/get-table/map-total-row')
let totalRow
let reductions

describe('map total row', () => {
  beforeEach(() => {
    totalRow = JSON.parse(JSON.stringify(require('../../../../../mock-statement-data').funding.find(x => x.name === 'Total')))
    reductions = [{ id: 1, reason: 'Late claim submission' }, { id: 2, reason: 'Over declaration reduction' }]
  })

  test('includes all table columns', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result.length).toBe(8)
  })

  test('includes funding option', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[0].text).toBe(totalRow.name)
  })

  test('includes funding level', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[1].text).toBe(totalRow.level)
  })

  test('includes funding rate', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[2].text).toBe(totalRow.rate)
  })

  test('includes area', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[3].text).toBe(totalRow.area)
  })

  test('includes annual value', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[4].text).toBe(`£${totalRow.annualValue}`)
  })

  test('includes quarterly value', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[5].text).toBe(`£${totalRow.quarterlyValue}`)
  })

  test('includes quarterly reduction', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[6].text).toBe(`£${totalRow.quarterlyReduction}`)
  })

  test('includes quarterly payment', () => {
    const result = mapTotalRow(totalRow, reductions)
    expect(result[7].text).toBe(`£${totalRow.quarterlyPayment}`)
  })
})
