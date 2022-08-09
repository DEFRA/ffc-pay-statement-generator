const mapFundingRows = require('../../../../../../app/generator/content/part2/get-table/map-funding-rows')
let mockStatement
let reductions

describe('map funding rows', () => {
  beforeEach(() => {
    mockStatement = JSON.parse(JSON.stringify(require('../../../../../mock-statement-data')))
    reductions = [{ id: 1, reason: 'Late claim submission' }, { id: 2, reason: 'Over declaration reduction' }]
  })

  test('includes all table rows when five funding options', () => {
    const result = mapFundingRows(mockStatement.funding, reductions)
    expect(result.length).toBe(5)
  })

  test('includes all table columns', () => {
    const result = mapFundingRows(mockStatement.funding, reductions)
    expect(result[0].length).toBe(8)
  })

  test('includes funding option', () => {
    const result = mapFundingRows(mockStatement.funding, reductions)
    expect(result[0][0]).toBe(mockStatement.funding[0].name)
  })

  test('includes funding level', () => {
    const result = mapFundingRows(mockStatement.funding, reductions)
    expect(result[0][1]).toBe(mockStatement.funding[0].level)
  })

  test('includes funding rate', () => {
    const result = mapFundingRows(mockStatement.funding, reductions)
    expect(result[0][2].text).toBe(mockStatement.funding[0].rate)
  })

  test('includes area', () => {
    const result = mapFundingRows(mockStatement.funding, reductions)
    expect(result[0][3].text).toBe(mockStatement.funding[0].area)
  })

  test('includes annual value', () => {
    const result = mapFundingRows(mockStatement.funding, reductions)
    expect(result[0][4].text).toBe(`£${mockStatement.funding[0].annualValue}`)
  })

  test('includes quarterly value', () => {
    const result = mapFundingRows(mockStatement.funding, reductions)
    expect(result[0][5].text).toBe(`£${mockStatement.funding[0].quarterlyValue}`)
  })

  test('includes quarterly reduction', () => {
    const result = mapFundingRows(mockStatement.funding, reductions)
    expect(result[0][6].text).toBe(`£${mockStatement.funding[0].quarterlyReduction}`)
  })

  test('includes quarterly payment', () => {
    const result = mapFundingRows(mockStatement.funding, reductions)
    expect(result[0][7].text).toBe(`£${mockStatement.funding[0].quarterlyPayment}`)
  })
})
