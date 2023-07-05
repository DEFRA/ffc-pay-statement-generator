jest.mock('../../../../../../app/generator/content/schedule/part3/get-table')
const { getTable } = require('../../../../../../app/generator/content/schedule/part3/get-table')

const part3 = require('../../../../../../app/generator/content/schedule/part3')
const { topUpSchedule, reductionSchedule, reductionZeroSchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule part 3 integration with getSummary components', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Ensure getTable is called once', () => {
    part3(topUpSchedule)
    expect(getTable).toHaveBeenCalledTimes(1)
  })

  describe('top-up schedule part 3', () => {
    test('Ensure top-up summary header style is set to header3', () => {
      const result = part3(topUpSchedule)
      expect(result.stack[0].style).toBe('header3')
    })

    test('Ensure top-up summary title text is "Payment schedule"', () => {
      const result = part3(topUpSchedule)
      expect(result.stack[0].text).toBe('Payment schedule')
    })

    test('includes unbreakable instruction when top up schedule', () => {
      const result = part3(topUpSchedule)
      expect(result.unbreakable).toBeTruthy()
    })
  })

  describe('reduction zero schedule part 3', () => {
    test('Ensure reduction summary header style is set to header3', () => {
      const result = part3(reductionSchedule)
      expect(result.stack[0].style).toBe('header3')
    })

    test('Ensure reduction summary title text is "Payment schedule"', () => {
      const result = part3(reductionSchedule)
      expect(result.stack[0].text).toBe('Payment schedule')
    })

    test('includes unbreakable instruction when reduction schedule', () => {
      const result = part3(reductionSchedule)
      expect(result.unbreakable).toBeTruthy()
    })
  })

  describe('reduction Zero schedule part 3', () => {
    test('Ensure reduction zero summary header style is set to header3', () => {
      const result = part3(reductionZeroSchedule)
      expect(result.stack[0].style).toBe('header3')
    })

    test('Ensure reduction zero summary title text is "Payment schedule"', () => {
      const result = part3(reductionZeroSchedule)
      expect(result.stack[0].text).toBe('Payment schedule')
    })

    test('includes unbreakable instruction when reduction schedule', () => {
      const result = part3(reductionZeroSchedule)
      expect(result.unbreakable).toBeTruthy()
    })
  })
})
