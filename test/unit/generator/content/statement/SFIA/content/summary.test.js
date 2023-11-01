const advanceSummary = require('../../../../../../../app/generator/content/statement/SFIA/content/advance-summary')

describe('advanceSummary', () => {
  const document = {
    sbi: '12345678',
    businessName: 'Example Business',
    scheme: {
      agreementNumber: 'ABC123'
    }
  }

  it('should return the correct summary object', () => {
    const result = advanceSummary(document)

    expect(result.stack).toHaveLength(6)
    expect(result.stack[0]).toHaveProperty('image')
    expect(result.stack[1]).toHaveProperty('text', 'SBI: 12345678')
    expect(result.stack[2]).toHaveProperty('text', 'Business Name: Example Business')
    expect(result.stack[3]).toHaveProperty('text', 'Agreement Number: ABC123')
    expect(result.stack[4]).toHaveProperty('text', 'Our ref: SFI 23 Accelerated payment v1.0')
    expect(result.stack[5]).toHaveProperty('text', 'Dear Sir / Madam')
  })
})
