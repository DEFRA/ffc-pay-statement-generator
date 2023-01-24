const summary = require('../../../../../../app/generator/content/schedule/summary')
const mockSchedule = require('../../../../../mocks/mock-schedule')

describe('generate summary', () => {
  test('includes RPA logo', () => {
    const result = summary(mockSchedule)
    expect(result.stack[0].image.endsWith('rpa-logo.jfif')).toBeTruthy()
  })

  test('includes address', () => {
    const result = summary(mockSchedule)
    expect(result.stack[1].text).toMatch('Mr A Farmer\nA Farm\nNear a field\nNewcastle Upon Tyne\nTyne & Wear\nNE1 1AA')
  })

  test('includes header with both scheme name and year for SFI 22', () => {
    const result = summary(mockSchedule)
    expect(result.stack[2].text).toBe('Sustainable Farming Incentive 2022')
  })

  test('includes subtitle', () => {
    const result = summary(mockSchedule)
    expect(result.stack[3].text).toBe('Revised payment schedule')
  })
})
