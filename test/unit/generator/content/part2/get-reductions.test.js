const getReductions = require('../../../../../app/generator/content/part2/get-reductions')
const mockReductions = require('../../../../mocks/reductions')

describe('get reductions', () => {
  test('returns empty string in array if no reductions', () => {
    const result = getReductions([])
    expect(result.length).toBe(1)
    expect(result[0]).toBe('')
  })

  test('includes reductions header if reductions', () => {
    const reductions = [mockReductions[0]]
    const result = getReductions(reductions)
    expect(result[0].text).toBe('Reason for reductions')
  })

  test('includes reductions header with style if reductions', () => {
    const reductions = [mockReductions[0]]
    const result = getReductions(reductions)
    expect(result[0].style).toBe('header3')
  })

  test('includes reductions list if single reduction', () => {
    const reductions = [mockReductions[0]]
    const result = getReductions(reductions)
    expect(result[1]).toBe('(1) Late claim submission')
    expect(result.length).toBe(2)
  })

  test('includes reductions list if multiple reductions', () => {
    const reductions = [mockReductions[0], mockReductions[1]]
    const result = getReductions(reductions)
    expect(result[1]).toBe('(1) Late claim submission')
    expect(result[2]).toBe('(2) Over declaration reduction')
    expect(result.length).toBe(3)
  })
})
