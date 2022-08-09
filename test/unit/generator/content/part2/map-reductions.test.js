const mapReductions = require('../../../../../app/generator/content/part2/map-reductions')

describe('map reductions', () => {
  test('returns empty array if no reductions', () => {
    const result = mapReductions([{}])
    expect(result.length).toBe(0)
  })

  test('returns empty array if empty array of reductions', () => {
    const result = mapReductions([{ reductions: [] }])
    expect(result.length).toBe(0)
  })

  test('returns empty array if no funding', () => {
    const result = mapReductions([])
    expect(result.length).toBe(0)
  })

  test('returns reductions if one reduction', () => {
    const result = mapReductions([{ reductions: [{ reason: 'reason' }] }])
    expect(result.length).toBe(1)
  })

  test('maps id to reduction if one reduction', () => {
    const result = mapReductions([{ reductions: [{ reason: 'reason' }] }])
    expect(result[0].id).toBe(1)
  })

  test('maps reason to reduction if one reduction', () => {
    const result = mapReductions([{ reductions: [{ reason: 'reason' }] }])
    expect(result[0].reason).toBe('reason')
  })

  test('returns reductions if multiple reductions', () => {
    const result = mapReductions([{ reductions: [{ reason: 'reason' }] }, { reductions: [{ reason: 'reason2' }] }])
    expect(result.length).toBe(2)
  })

  test('maps id to reduction if multiple reductions', () => {
    const result = mapReductions([{ reductions: [{ reason: 'reason' }] }, { reductions: [{ reason: 'reason2' }] }])
    expect(result[0].id).toBe(1)
    expect(result[1].id).toBe(2)
  })

  test('maps reason to reduction if multiple reductions', () => {
    const result = mapReductions([{ reductions: [{ reason: 'reason' }] }, { reductions: [{ reason: 'reason2' }] }])
    expect(result[0].reason).toBe('reason')
    expect(result[1].reason).toBe('reason2')
  })
})