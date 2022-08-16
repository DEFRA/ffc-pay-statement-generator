const getLatestPayment = require('../../../../../app/generator/content/part1/get-latest-payment')

describe('get latest payment', () => {
  test('gets latest payment when only one payment', () => {
    const payments = [{
      settled: '1 July 2022',
      value: 100
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[0])
  })
})
