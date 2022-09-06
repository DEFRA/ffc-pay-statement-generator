const getLatestPayment = require('../../../../../app/generator/content/part1/get-latest-payment')

describe('get latest payment', () => {
  test('gets latest payment when only one payment', () => {
    const payments = [{
      expected: '1 July 2022'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[0])
  })

  test('gets latest payment by month when two payments in order', () => {
    const payments = [{
      expected: '1 July 2022'
    }, {
      expected: '1 August 2022'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[1])
  })

  test('gets latest payment by month when two payments out of order', () => {
    const payments = [{
      expected: '1 August 2022'
    }, {
      expected: '1 July 2022'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[0])
  })

  test('gets latest payment by month when three payments in order', () => {
    const payments = [{
      expected: '1 July 2022'
    }, {
      expected: '1 August 2022'
    }, {
      expected: '1 September 2022'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[2])
  })

  test('gets latest payment by month when three payments in reverse order', () => {
    const payments = [{
      expected: '1 September 2022'
    }, {
      expected: '1 August 2022'
    }, {
      expected: '1 July 2022'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[0])
  })

  test('gets latest payment by month when three payments out of order', () => {
    const payments = [{
      expected: '1 August 2022'
    }, {
      expected: '1 September 2022'
    }, {
      expected: '1 July 2022'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[1])
  })

  test('gets last payment in array when duplicate settlement dates', () => {
    const payments = [{
      expected: '1 August 2022',
      value: 100
    }, {
      expected: '1 August 2022',
      value: 200
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[1])
  })

  test('gets latest payment by month when spans years and same month in order', () => {
    const payments = [{
      expected: '1 July 2022'
    }, {
      expected: '1 July 2023'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[1])
  })

  test('gets latest payment by month when spans years and same month out of order', () => {
    const payments = [{
      expected: '1 July 2023'
    }, {
      expected: '1 July 2022'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[0])
  })

  test('gets latest payment by month when spans years in order', () => {
    const payments = [{
      expected: '1 September 2022'
    }, {
      expected: '1 July 2023'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[1])
  })

  test('gets latest payment by month when spans years out of order', () => {
    const payments = [{
      expected: '1 July 2023'
    }, {
      expected: '1 September 2022'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[0])
  })

  test('gets latest payment by month when leap year earliest', () => {
    const payments = [{
      expected: '29 February 2024'
    }, {
      expected: '1 September 2024'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[1])
  })

  test('gets latest payment by month when leap year latest', () => {
    const payments = [{
      expected: '29 February 2024'
    }, {
      expected: '1 September 2023'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[0])
  })

  test('gets valid date when invalid present and invalid earliest', () => {
    const payments = [{
      expected: '31 June 2022'
    }, {
      expected: '1 September 2023'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[1])
  })

  test('gets valid date when invalid latest', () => {
    const payments = [{
      expected: '30 September 2022'
    }, {
      expected: '31 June 2023'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[0])
  })

  test('gets valid date when invalid leap year and invalid earliest', () => {
    const payments = [{
      expected: '22 July 2025'
    }, {
      expected: '29 February 2023'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[0])
  })

  test('gets valid date when invalid leap year and invalid latest', () => {
    const payments = [{
      expected: '22 July 2022'
    }, {
      expected: '29 February 2023'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[0])
  })

  test('gets last payment when no valid dates', () => {
    const payments = [{
      expected: '31 September 2022'
    }, {
      expected: '31 June 2023'
    }]
    const result = getLatestPayment(payments)
    expect(result).toStrictEqual(payments[1])
  })
})
