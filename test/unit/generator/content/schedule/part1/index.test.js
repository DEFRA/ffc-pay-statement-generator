const part1 = require('../../../../../../app/generator/content/schedule/part1')

const { topUpSchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule Part 1', () => {
  test('includes RPA logo', () => {
    const result = part1(topUpSchedule)
    expect(result.stack[0].image.endsWith('rpa-logo.jfif')).toBeTruthy()
  })

  test('logo style is set to scheduleLogo', () => {
    const result = part1(topUpSchedule)
    expect(result.stack[0].style).toBe('scheduleLogo')
  })

  test('includes address', () => {
    const result = part1(topUpSchedule)
    expect(result.stack[1].text).toMatch('Mr A Farmer\nA Farm\nA Place\nA Location\nA Town\nA County\nNE1 1AA\n')
  })

  test('includes header with both scheme name and year for SFI', () => {
    const result = part1(topUpSchedule)
    expect(result.stack[2].text).toBe('Sustainable Farming Incentive')
  })

  test('includes subtitle', () => {
    const result = part1(topUpSchedule)
    expect(result.stack[3].text).toBe('Revised payment schedule')
  })
})
