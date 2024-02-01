const moment = require('moment')
const getFilename = require('../../../app/generator/create-filename')
const { STATEMENT } = require('../../../app/constants/document-types')

let timestamp
let errorStatement

describe('Validation functions', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmssSS')
    errorStatement = require('../../mocks/error-statement')
  })

  test('checks error message on incorrect scheme', () => {
    errorStatement.scheme.year = '2022'
    errorStatement.frn = 1234567890
    timestamp = '2022080515301012'
    expect(() => getFilename(errorStatement, timestamp, STATEMENT)).toThrow('invalid short name')
  })

  test('checks error message on incorrect scheme year', () => {
    errorStatement.scheme.shortName = 'SFI'
    errorStatement.scheme.year = '20220'
    errorStatement.frn = 1234567890
    timestamp = '2022080515301012'
    expect(() => getFilename(errorStatement, timestamp, STATEMENT)).toThrow('invalid scheme year')
  })

  test('checks error message on incorrect frn', () => {
    errorStatement.scheme.shortName = 'SFI'
    errorStatement.scheme.year = '2022'
    errorStatement.frn = '123456789012'
    timestamp = '2022080515301012'
    expect(() => getFilename(errorStatement, timestamp, STATEMENT)).toThrow('invalid frn number')
  })

  test('checks error message on incorrect timestamp', () => {
    errorStatement.scheme.shortName = 'SFI'
    errorStatement.scheme.year = '2022'
    errorStatement.frn = 1234567890
    timestamp = '202208051530'
    expect(() => getFilename(errorStatement, timestamp, STATEMENT)).toThrow('invalid timestamp')
  })
})
