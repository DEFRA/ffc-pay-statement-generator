const getReductions = require('../../../../../app/generator/content/part2/get-reductions')

describe('get reductions', () => {
  test('returns empty string in array if no reductions', () => {
    const result = getReductions([])
    expect(result.length).toBe(1)
    expect(result[0]).toBe('')
  })

  test('includes reductions header if reductions', () => {
    const reductions = [{ id: 1, reason: 'reason' }]
    const result = getReductions(reductions)
    expect(result[0].text).toBe('Reason for reductions')
  })

  test('includes reductions list if single reduction', () => {
    const reductions = [{ id: 1, reason: 'reason' }]
    const result = getReductions(reductions)
    expect(result[1]).toBe('(1) reason')
    expect(result.length).toBe(2)
  })

  test('includes reductions list if multiple reductions', () => {
    const reductions = [{ id: 1, reason: 'reason' }, { id: 2, reason: 'reason2' }]
    const result = getReductions(reductions)
    expect(result[1]).toBe('(1) reason')
    expect(result[2]).toBe('(2) reason2')
    expect(result.length).toBe(3)
  })
})
