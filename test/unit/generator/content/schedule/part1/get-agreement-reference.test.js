const getAgreementReference = require('../../../../../../app/generator/content/schedule/part1/get-agreement-reference')

const agreementReference = require('../../../../../mocks/components/agreement-reference')

describe('get agreement reference', () => {
  test('returns two columns', () => {
    const result = getAgreementReference(agreementReference)
    expect(result.columns.length).toBe(2)
  })

  test('returns title column text', () => {
    const result = getAgreementReference(agreementReference)
    expect(result.columns[0].text).toBe('Agreement reference number:')
  })

  test('returns title column width', () => {
    const result = getAgreementReference(agreementReference)
    expect(result.columns[0].width).toBe(200)
  })

  test('returns business name column text', () => {
    const result = getAgreementReference(agreementReference)
    expect(result.columns[1].text).toBe(agreementReference)
  })

  test('returns business name column width', () => {
    const result = getAgreementReference(agreementReference)
    expect(result.columns[1].width).toBe('*')
  })

  test('returns column style', () => {
    const result = getAgreementReference(agreementReference)
    expect(result.style).toBe('column')
  })

  test('returns column gap', () => {
    const result = getAgreementReference(agreementReference)
    expect(result.columnGap).toBe(10)
  })
})
