const getFilename = require('../../../app/generator/create-filename')
const PREFIX = 'FFC_PaymentStatement_'
const EXTENSION = '.pdf'
let mockStatement

describe('create filename', () => {
  beforeEach(() => {
    mockStatement = require('../../mock-statement-data')
  })

  test('starts filename prefix', async () => {
    const result = getFilename(mockStatement)
    expect(result.startsWith(PREFIX)).toBeTruthy()
  })

  test('has PDF extension', async () => {
    const result = getFilename(mockStatement)
    expect(result.endsWith(EXTENSION)).toBeTruthy()
  })

  test('includes scheme for SFI', async () => {
    mockStatement.scheme.shortName = 'SFI'
    const result = getFilename(mockStatement)
    expect(result).toContain('_SFI_')
  })

  test('includes scheme for SFI Pilot', async () => {
    mockStatement.scheme.shortName = 'SFIP'
    const result = getFilename(mockStatement)
    expect(result).toContain('_SFIP_')
  })

  test('includes scheme for Lump Sums', async () => {
    mockStatement.scheme.shortName = 'LSES'
    const result = getFilename(mockStatement)
    expect(result).toContain('_LSES_')
  })

  test('includes scheme for Vets Visits', async () => {
    mockStatement.scheme.shortName = 'VV'
    const result = getFilename(mockStatement)
    expect(result).toContain('_VV_')
  })
})
