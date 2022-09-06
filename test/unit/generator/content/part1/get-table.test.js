const getTable = require('../../../../../app/generator/content/part1/get-table')
let mockStatement
let latestPeriod

describe('get table', () => {
  beforeEach(() => {
    mockStatement = JSON.parse(JSON.stringify(require('../../../../mocks/statement-data')))
    latestPeriod = 'for July to September 2022'
  })

  test('includes table with a single row', () => {
    const result = getTable(mockStatement.scheme, mockStatement.payments[0], latestPeriod)
    expect(result.table.body.length).toBe(1)
  })

  test('includes table with a single column', () => {
    const result = getTable(mockStatement.scheme, mockStatement.payments[0], latestPeriod)
    expect(result.table.body[0].length).toBe(1)
  })

  test('includes table cell with background colour', () => {
    const result = getTable(mockStatement.scheme, mockStatement.payments[0], latestPeriod)
    expect(result.table.body[0][0].fillColor).toBe('#d9d9d9')
  })

  test('includes payment schedule', () => {
    const result = getTable(mockStatement.scheme, mockStatement.payments[0], latestPeriod)
    expect(result.table.body[0][0].stack[0].text).toBe('Your quarterly SFI payment for July to September 2022 is £242.15')
  })

  test('includes payment schedule when latest period single month', () => {
    latestPeriod = 'for July 2022'
    const result = getTable(mockStatement.scheme, mockStatement.payments[0], latestPeriod)
    expect(result.table.body[0][0].stack[0].text).toBe('Your quarterly SFI payment for July 2022 is £242.15')
  })

  test('includes payment date', () => {
    const result = getTable(mockStatement.scheme, mockStatement.payments[0], latestPeriod)
    expect(result.table.body[0][0].stack[1]).toMatch('\nWe will usually pay this into your account by 1 July 2022.\n')
  })

  test('includes calculation date title', () => {
    const result = getTable(mockStatement.scheme, mockStatement.payments[0], latestPeriod)
    expect(result.table.body[0][0].stack[2].columns[0].text).toBe('Calculation date:')
  })

  test('includes calculation date value', () => {
    const result = getTable(mockStatement.scheme, mockStatement.payments[0], latestPeriod)
    expect(result.table.body[0][0].stack[2].columns[1].text).toBe('16 June 2022')
  })

  test('includes reference title', () => {
    const result = getTable(mockStatement.scheme, mockStatement.payments[0], latestPeriod)
    expect(result.table.body[0][0].stack[3].columns[0].text).toBe('Payment reference number:')
  })

  test('includes reference value', () => {
    const result = getTable(mockStatement.scheme, mockStatement.payments[0], latestPeriod)
    expect(result.table.body[0][0].stack[3].columns[1].text).toBe('PY1234567')
  })
})
