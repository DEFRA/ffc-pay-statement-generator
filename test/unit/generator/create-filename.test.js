const moment = require('moment')
const getFilename = require('../../../app/generator/create-filename')
const PREFIX = 'FFC_PaymentStatement_'
const EXTENSION = '.pdf'
let mockStatement
let timestamp

describe('create filename', () => {
  beforeEach(() => {
    mockStatement = require('../../mock-statement-data')
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmss')
  })

  test('writes full filename', () => {
    const result = getFilename(mockStatement, timestamp)
    expect(result).toBe('FFC_PaymentStatement_SFI_2022_1234567890_20220805153010.pdf')
  })

  test('starts filename prefix', () => {
    const result = getFilename(mockStatement, timestamp)
    expect(result.startsWith(PREFIX)).toBeTruthy()
  })

  test('has PDF extension', () => {
    const result = getFilename(mockStatement, timestamp)
    expect(result.endsWith(EXTENSION)).toBeTruthy()
  })

  test('includes scheme short name', () => {
    mockStatement.scheme.shortName = 'SFI'
    const result = getFilename(mockStatement, timestamp)
    expect(result).toContain('_SFI_')
  })

  test('includes FRN', () => {
    mockStatement.frn = 1234567890
    const result = getFilename(mockStatement, timestamp)
    expect(result).toContain('_1234567890_')
  })

  test('includes timestamp', () => {
    const result = getFilename(mockStatement, timestamp)
    expect(result).toContain('_20220805153010')
  })

  test('removes spaces', () => {
    mockStatement.scheme.shortName = 'My Scheme'
    const result = getFilename(mockStatement, timestamp)
    expect(result).toContain('_MyScheme_')
  })
})
