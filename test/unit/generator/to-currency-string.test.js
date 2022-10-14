const toCurrencyString = require('../../../app/generator/to-currency-string')

describe('to currency string', () => {
  test('converts number to currency string', () => {
    expect(toCurrencyString('1234.56')).toBe('£1,234.56')
  })

  test('converts number to currency string with no decimal places', () => {
    expect(toCurrencyString('1234')).toBe('£1,234.00')
  })

  test('converts number to currency string with one decimal place', () => {
    expect(toCurrencyString('1234.5')).toBe('£1,234.50')
  })
})
