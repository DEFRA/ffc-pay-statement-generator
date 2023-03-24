const { getTable } = require('../../../../../../app/generator/content/schedule/part3/get-table')
const toCurrencyString = require('../../../../../../app/generator/to-currency-string')
let mockSchedule

describe('get table', () => {
  beforeEach(() => {
    mockSchedule = JSON.parse(JSON.stringify(require('../../../../../mocks/mock-schedule')))
  })

  test('includes table with three rows', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body.length).toBe(3)
  })

  test('includes table with six columns when four instalments and a top up', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.widths.length).toBe(mockSchedule.schedule.length + 1)
  })

  test('includes table with five columns when four instalments', () => {
    mockSchedule.schedule.pop()
    const result = getTable(mockSchedule.schedule)
    expect(result.table.widths.length).toBe(mockSchedule.schedule.length + 1)
  })

  test('includes table with four columns when three instalments', () => {
    mockSchedule.schedule.pop()
    mockSchedule.schedule.pop()
    const result = getTable(mockSchedule.schedule)
    expect(result.table.widths.length).toBe(mockSchedule.schedule.length + 1)
  })

  test('should use auto width columns for every column', () => {
    const result = getTable(mockSchedule.schedule)
    result.table.widths.forEach(width => {
      expect(width).toBe('*')
    })
  })

  test('should use solid line style for grid', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.layout.hLineStyle()).toBe('solid')
    expect(result.layout.vLineStyle()).toBe('solid')
  })

  test('should use table style', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.style).toBe('table')
  })

  test('should use tableHeader style for header row', () => {
    const result = getTable(mockSchedule.schedule)
    result.table.body[0].forEach(cell => {
      expect(cell.style).toBe('tableHeader')
    })
  })

  test('should use tableHeader style for first column', () => {
    const result = getTable(mockSchedule.schedule)
    result.table.body.forEach(row => {
      expect(row[0].style).toBe('tableHeader')
    })
  })

  test('should use tableNumber style for value rows', () => {
    const result = getTable(mockSchedule.schedule)
    result.table.body.filter((r, i) => i > 0).forEach(row => {
      const valueRows = row.filter((x, i) => i > 0)
      valueRows.forEach(cell => {
        expect(cell.style).toBe('tableNumber')
      })
    })
  })

  test('header is Payment period for first row', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body[0][0].text).toBe('Payment type')
  })

  test('header is Payment amount for second row', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body[1][0].text).toBe('Amount')
  })

  test('header is Payment due for third row', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body[2][0].text).toBe('Payment Period')
  })

  test('includes first instalment period as first column if first paid', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body[0][1].text).toBe(mockSchedule.schedule[0].paymentType)
  })

  test('includes all payment period values from schedule as headers', () => {
    const result = getTable(mockSchedule.schedule)
    mockSchedule.schedule.forEach((instalment, i) => {
      expect(result.table.body[0][i + 1].text).toBe(instalment.paymentType)
    })
  })

  test('includes all values from schedule as values', () => {
    const result = getTable(mockSchedule.schedule)
    mockSchedule.schedule.forEach((instalment, i) => {
      expect(result.table.body[1][i + 1].text).toBe(toCurrencyString(instalment.value))
    })
  })

  test('includes all due dates from schedule', () => {
    const result = getTable(mockSchedule.schedule)
    mockSchedule.schedule.forEach((instalment, i) => {
      expect(result.table.body[2][i + 1].text).toBe(instalment.period)
    })
  })
})
