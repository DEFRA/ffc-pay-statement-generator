const getLatestPeriod = require('../../../../../app/generator/content/part1/get-latest-period')
let scheme
let payment

describe('for get latest period', () => {
  beforeEach(() => {
    scheme = {
      frequency: 'Monthly'
    }
    payment = {
      dueDate: '1 June 2022',
      expected: '1 July 2022'
    }
  })

  test('returns single month of settlement date if schedule not quarterly', () => {
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('for July 2022')
  })

  test('returns single month of settlement date if first of month', () => {
    payment.expected = '1 June 2022'
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('for June 2022')
  })

  test('returns single month of settlement date if 30th of month', () => {
    payment.expected = '30 June 2022'
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('for June 2022')
  })

  test('returns single month of settlement date if 31st of month', () => {
    payment.expected = '31 July 2022'
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('for July 2022')
  })

  test('returns single month of settlement date if leap year', () => {
    payment.expected = '29 February 2024'
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('for February 2024')
  })

  test('returns month range of due date if starts in January', () => {
    scheme.frequency = 'Quarterly'
    payment.dueDate = '1 January 2022'
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('for January to March 2022')
  })

  test('returns month range of due date if overlaps new year', () => {
    scheme.frequency = 'Quarterly'
    payment.dueDate = '1 November 2022'
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('for November to January 2023')
  })

  test('returns month range of due date if starts on leap year', () => {
    scheme.frequency = 'Quarterly'
    payment.dueDate = '29 February 2024'
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('for February to April 2024')
  })

  test('returns empty string if not quarterly and invalid date', () => {
    payment.expected = '31 June 2022'
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('')
  })

  test('returns empty string if not quarterly and invalid leap year', () => {
    payment.expected = '29 February 2022'
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('')
  })

  test('returns empty string if quarterly and invalid date', () => {
    scheme.frequency = 'Quarterly'
    payment.dueDate = '31 June 2022'
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('')
  })

  test('returns empty string if quarterly and invalid leap year', () => {
    scheme.frequency = 'Quarterly'
    payment.dueDate = '29 February 2022'
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('')
  })
})
