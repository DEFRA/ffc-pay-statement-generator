const summary = require('../../../../app/generator/content/summary')
const mockStatement = require('../../../mock-statement-data')

describe('generate summary', () => {
  test('includes RPA logo', () => {
    const result = summary(mockStatement)
    expect(result.stack[0].image.endsWith('rpa-logo.jfif')).toBeTruthy()
  })

  test('includes address', () => {
    const result = summary(mockStatement)
    expect(result.stack[1].text).toMatch('Mr A Farmer\nA Farm\nNear a field\nNewcastle Upon Tyne\nTyne & Wear\nNE1 1AA')
  })

  test('includes header with both scheme name and year for SFI 22', () => {
    const result = summary(mockStatement)
    expect(result.stack[2].text).toBe('Sustainable Farming Incentive 2022')
  })

  test('includes subtitle', () => {
    const result = summary(mockStatement)
    expect(result.stack[3].text).toBe('Payment statement')
  })
})
