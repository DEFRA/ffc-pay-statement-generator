const mapReductionIds = require('../../../../../../app/generator/content/part2/get-table/map-reduction-ids')
let reductions

describe('map reduction ids', () => {
  beforeEach(() => {
    reductions = require('../../../../../mocks/reductions')
  })

  test('returns empty string if no funding reductions', () => {
    const result = mapReductionIds(undefined, reductions)
    expect(result).toBe('')
  })

  test('returns empty string if empty funding reductions array', () => {
    const result = mapReductionIds([], reductions)
    expect(result).toBe('')
  })

  test('returns newline before reduction id', () => {
    const result = mapReductionIds([{ reason: 'Late claim submission' }], reductions)
    expect(result.startsWith('\n')).toBeTruthy()
  })

  test('returns reduction id when one reduction', () => {
    const result = mapReductionIds([{ reason: 'Late claim submission' }], reductions)
    expect(result).toMatch('\n(1)')
  })

  test('returns reduction ids when multiple reductions', () => {
    const result = mapReductionIds([{ reason: 'Late claim submission' }, { reason: 'Over declaration reduction' }], reductions)
    expect(result).toMatch('\n(1)\n(2)')
  })

  test('ignores unknown reductions', () => {
    const result = mapReductionIds([{ reason: 'Late claim submission' }, { reason: 'Over declaration reduction' }, { reason: 'reason3' }], reductions)
    expect(result).toMatch('\n(1)\n(2)')
  })

  test('ignores unknown reductions when unknown in middle', () => {
    const result = mapReductionIds([{ reason: 'Late claim submission' }, { reason: 'reason3' }, { reason: 'Over declaration reduction' }], reductions)
    expect(result).toMatch('\n(1)\n(2)')
  })
})
