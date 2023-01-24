const styles = require('../../../app/generator/styles')
const getDefinition = require('../../../app/generator/get-definition')
const mockStatement = require('../../mocks/statement-data')
const { A4 } = require('../../../app/generator/page-sizes')
const { STATEMENT } = require('../../../app/document-types')

describe('get definition', () => {
  test('includes A4 paper size', () => {
    const result = getDefinition(mockStatement, STATEMENT)
    expect(result.pageSize).toBe(A4)
  })

  test('includes all defined styles', () => {
    const result = getDefinition(mockStatement, STATEMENT)
    expect(result.styles).toStrictEqual(styles)
  })

  test('sets default style as default style', () => {
    const result = getDefinition(mockStatement, STATEMENT)
    expect(result.defaultStyle).toBe(styles.default)
  })

  test('sets left margin', () => {
    const result = getDefinition(mockStatement, STATEMENT)
    expect(result.pageMargins[0]).toBe(42.525)
  })

  test('sets top margin', () => {
    const result = getDefinition(mockStatement, STATEMENT)
    expect(result.pageMargins[1]).toBe(14.175)
  })

  test('sets right margin', () => {
    const result = getDefinition(mockStatement, STATEMENT)
    expect(result.pageMargins[2]).toBe(42.525)
  })

  test('sets bottom margin', () => {
    const result = getDefinition(mockStatement, STATEMENT)
    expect(result.pageMargins[3]).toBe(14.175)
  })
})
