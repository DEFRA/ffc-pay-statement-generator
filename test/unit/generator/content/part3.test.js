const part3 = require('../../../../app/generator/content/part3')
const mockStatement = require('../../../mock-statement-data')

describe('generate part 3', () => {
  test('includes header', () => {
    const result = part3(mockStatement)
    expect(result[0].text).toBe('Part 3. More support')
  })

  test('includes more support introduction', () => {
    const result = part3(mockStatement)
    expect(result[1]).toBe('If you think your payment is wrong you should:\n\n')
  })

  test('includes more support check Rural Payments link', () => {
    const result = part3(mockStatement)
    expect(result[2].ul[0].text[0]).toBe('check your land parcel information in the Rural Payments service at ')
    expect(result[2].ul[0].text[1].link).toBe('https://www.gov.uk/claim-rural-payments')
  })

  test('includes more support review SFI scheme link', () => {
    const result = part3(mockStatement)
    expect(result[2].ul[1].text[0]).toBe('review the SFI scheme information at ')
    expect(result[2].ul[1].text[1].link).toBe('https://www.gov.uk/sfi')
  })

  test('includes do not agree link', () => {
    const result = part3(mockStatement)
    expect(result[3].text[0]).toBe('If you still do not agree with the amount you have been paid, contact us within 3 months of the payment date at ')
    expect(result[3].text[1].link).toBe('ruralpayments@defra.gov.uk')
  })

  test('includes get in touch link', () => {
    const result = part3(mockStatement)
    expect(result[4].text[0]).toBe('Find other ways to get in touch at ')
    expect(result[4].text[1].link).toBe('https://www.gov.uk/guidance/contacting-the-rpa-about-sfi')
    expect(result[4].text[2]).toBe('.')
  })

  test('includes large text', () => {
    const result = part3(mockStatement)
    expect(result[5].text).toBe('To receive this statement in large print or alternative format, contact the Rural Payments Agency')
  })
})
