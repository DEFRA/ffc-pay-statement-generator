const getLatestPeriod = require('../../../../../app/generator/content/part1/get-latest-period')
let scheme
let payment

describe('get latest period', () => {
  beforeEach(() => {
    scheme = {
      frequency: 'Monthly'
    }
    payment = {
      settled: '1 July 2022'
    }
  })

  test('returns single month if schedule not quarterly', () => {
    const result = getLatestPeriod(scheme, payment)
    expect(result).toBe('July 2022')
  })
})
