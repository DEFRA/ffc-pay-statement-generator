const part1 = require('../../../../../../app/generator/content/schedule/part1')

const { topUpSchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule Part 1', () => {
  test('includes RPA logo', () => {
    const result = part1(topUpSchedule)
    expect(result.stack[0].image.endsWith('v2/logo.jpg')).toBeTruthy()
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
    expect(result.stack[5].text).toBe(`${topUpSchedule.scheme.name} (${topUpSchedule.scheme.shortName}) revised payment schedule `)
  })

  test('header style is set to header3', () => {
    const result = part1(topUpSchedule)
    expect(result.stack[5].style).toBe('header3')
  })

  test('includes unbreakable instruction', () => {
    const result = part1(topUpSchedule)
    expect(result.unbreakable).toBeTruthy()
  })
})
