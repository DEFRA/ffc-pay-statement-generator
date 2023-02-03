const part1 = require('../../../../../../app/generator/content/schedule/part1')
const mockSchedule = require('../../../../../mocks/mock-schedule')

describe('schedule part 1', () => {
  test('should include payment schedule header', () => {
    const result = part1(mockSchedule)
    expect(result.stack[0]).toEqual({ text: 'Payment schedule', style: 'header2' })
  })

  test('should include adjustment', () => {
    const result = part1(mockSchedule)
    expect(result.stack[1].length).toBe(3)
  })

  test('should include table', () => {
    const result = part1(mockSchedule)
    expect(result.stack[2].table).toBeDefined()
  })

  test('should be unbreakable', () => {
    const result = part1(mockSchedule)
    expect(result.unbreakable).toBeTruthy()
  })
})
