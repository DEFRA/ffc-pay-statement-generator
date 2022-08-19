const part3 = require('../../../../app/generator/content/part3')
const mockStatement = require('../../../mocks/statement-data')

describe('generate part 3', () => {
  test('includes header', () => {
    const result = part3(mockStatement)
    expect(result.stack[0].text).toBe('Part 3. More support')
  })

  test('includes header with style', () => {
    const result = part3(mockStatement)
    expect(result.stack[0].style).toBe('header2')
  })

  test('includes more support introduction', () => {
    const result = part3(mockStatement)
    expect(result.stack[1]).toBe('If you think your payment is wrong, you should:\n\n')
  })

  test('includes more support check Rural Payments text', () => {
    const result = part3(mockStatement)
    expect(result.stack[2].ul[0].text[0]).toBe('check your land parcel information in the Rural Payments service at ')
  })

  test('includes more support check Rural Payments link', () => {
    const result = part3(mockStatement)
    expect(result.stack[2].ul[0].text[1].link).toBe('https://www.gov.uk/claim-rural-payments')
  })

  test('includes more support check Rural Payments link with link style', () => {
    const result = part3(mockStatement)
    expect(result.stack[2].ul[0].text[1].style).toBe('link')
  })

  test('includes more support review SFI scheme link text', () => {
    const result = part3(mockStatement)
    expect(result.stack[2].ul[1].text[0]).toBe('review the SFI scheme information at ')
  })

  test('includes more support review SFI scheme link', () => {
    const result = part3(mockStatement)
    expect(result.stack[2].ul[1].text[1].link).toBe('https://www.gov.uk/sfi')
  })

  test('includes more support review SFI scheme link style', () => {
    const result = part3(mockStatement)
    expect(result.stack[2].ul[1].text[1].style).toBe('link')
  })

  test('includes more support review SFI scheme link text', () => {
    const result = part3(mockStatement)
    expect(result.stack[2].ul[1].text[0]).toBe('review the SFI scheme information at ')
  })

  test('includes more support review SFI scheme link', () => {
    const result = part3(mockStatement)
    expect(result.stack[2].ul[1].text[1].link).toBe('https://www.gov.uk/sfi')
  })

  test('includes more support review SFI scheme link style', () => {
    const result = part3(mockStatement)
    expect(result.stack[2].ul[1].text[1].style).toBe('link')
  })

  test('includes do not agree link text', () => {
    const result = part3(mockStatement)
    expect(result.stack[3].text[0]).toBe('If you still do not agree with the amount you have been paid, contact us within 3 months of the payment date at ')
  })

  test('includes do not agree link', () => {
    const result = part3(mockStatement)
    expect(result.stack[3].text[1].link).toBe('mailto:ruralpayments@defra.gov.uk')
  })

  test('includes do not agree link style', () => {
    const result = part3(mockStatement)
    expect(result.stack[3].text[1].style).toBe('link')
  })

  test('includes get in touch link text', () => {
    const result = part3(mockStatement)
    expect(result.stack[4].text[0]).toBe('Find other ways to get in touch at ')
  })

  test('includes get in touch link', () => {
    const result = part3(mockStatement)
    expect(result.stack[4].text[1].link).toBe('https://www.gov.uk/guidance/contacting-the-rpa-about-sfi')
  })

  test('includes get in touch link style', () => {
    const result = part3(mockStatement)
    expect(result.stack[4].text[1].style).toBe('link')
  })

  test('includes large text', () => {
    const result = part3(mockStatement)
    expect(result.stack[5].text).toBe('To receive this statement in large print or another alternative format, contact the Rural Payments Agency.')
  })

  test('includes large text style', () => {
    const result = part3(mockStatement)
    expect(result.stack[5].style).toBe('header2')
  })

  test('includes unbreakable instruction', () => {
    const result = part3(mockStatement)
    expect(result.unbreakable).toBeTruthy()
  })
})
