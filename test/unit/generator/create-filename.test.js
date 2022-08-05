const getFilename = require('../../../app/generator/create-filename')
const PREFIX = 'FFC_PaymentStatement_'
const EXTENSION = '.pdf'
let mockStatement

describe('create filename', () => {
  beforeEach(() => {
    mockStatement = require('../../mock-statement-data')
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10))
  })

  test('writes full filename', async () => {
    const result = getFilename(mockStatement)
    expect(result).toBe('FFC_PaymentStatement_SFI_2022_12345674890_20220805153010.pdf')
  })

  test('starts filename prefix', async () => {
    const result = getFilename(mockStatement)
    expect(result.startsWith(PREFIX)).toBeTruthy()
  })

  test('has PDF extension', async () => {
    const result = getFilename(mockStatement)
    expect(result.endsWith(EXTENSION)).toBeTruthy()
  })

  test('includes scheme short name', async () => {
    mockStatement.scheme.shortName = 'SFI'
    const result = getFilename(mockStatement)
    expect(result).toContain('_SFI_')
  })

  test('includes FRN', async () => {
    mockStatement.frn = 1234567890
    const result = getFilename(mockStatement)
    expect(result).toContain('_1234567890_')
  })

  test('includes timestamp', async () => {
    const result = getFilename(mockStatement)
    expect(result).toContain('_20220805153010')
  })

  test('removes spaces', async () => {
    mockStatement.scheme.shortName = 'My Scheme'
    const result = getFilename(mockStatement)
    expect(result).toContain('_MyScheme_')
  })
})
