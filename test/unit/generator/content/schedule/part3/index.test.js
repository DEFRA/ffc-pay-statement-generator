jest.mock('../../../../../../app/generator/content/schedule/part3/get-table')
const { getTable } = require('../../../../../../app/generator/content/schedule/part3/get-table')

jest.mock('../../../../../../app/generator/content/schedule/part3/get-reduction-summary')
const getReductionSummary = require('../../../../../../app/generator/content/schedule/part3/get-reduction-summary')

jest.mock('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')
const getTopUpSummary = require('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')

jest.mock('../../../../../../app/generator/content/schedule/part3/get-reduction-zero-summary')
const getReductionZeroSummary = require('../../../../../../app/generator/content/schedule/part3/get-reduction-zero-summary')

const part3 = require('../../../../../../app/generator/content/schedule/part3')
const { topUpSchedule, reductionSchedule, reductionZeroSchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule part 3', () => {
  afterEach(() => {
    jest.clearAllMocks()
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

    test('Ensure getTable is called', () => {
      part3(topUpSchedule)
      expect(getTable).toHaveBeenCalled()
    })

    test('Ensure getTable is called once', () => {
      part3(topUpSchedule)
      expect(getTable).toHaveBeenCalledTimes(1)
    })

    test('Ensure getTable is called with topUpSchedule.schedule', () => {
      part3(topUpSchedule)
      expect(getTable).toHaveBeenCalledWith(topUpSchedule.schedule)
    })

    test('Ensure getTopUpSummary is called', () => {
      part3(topUpSchedule)
      expect(getTopUpSummary).toHaveBeenCalled()
    })

    test('Ensure getTopUpSummary is called once', () => {
      part3(topUpSchedule)
      expect(getTopUpSummary).toHaveBeenCalledTimes(1)
    })

    test('Ensure getTopUpSummary is called with topUpSchedule.adjustment', () => {
      part3(topUpSchedule)
      expect(getTopUpSummary).toHaveBeenCalledWith(topUpSchedule.adjustment)
    })

    test('Ensure getReductionSummary is not called', () => {
      part3(topUpSchedule)
      expect(getReductionSummary).not.toHaveBeenCalled()
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

    test('Ensure getTable is called', () => {
      part3(reductionSchedule)
      expect(getTable).toHaveBeenCalled()
    })

    test('Ensure getTable is called once', () => {
      part3(reductionSchedule)
      expect(getTable).toHaveBeenCalledTimes(1)
    })

    test('Ensure getTable is called with reductionSchedule.schedule', () => {
      part3(reductionSchedule)
      expect(getTable).toHaveBeenCalledWith(reductionSchedule.schedule)
    })

    test('Ensure getReductionSummary is called', () => {
      part3(reductionSchedule)
      expect(getReductionSummary).toHaveBeenCalled()
    })

    test('Ensure getReductionSummary is called once', () => {
      part3(reductionSchedule)
      expect(getReductionSummary).toHaveBeenCalledTimes(1)
    })

    test('Ensure getReductionSummary is called with reductionSchedule', () => {
      part3(reductionSchedule)
      expect(getReductionSummary).toHaveBeenCalledWith(reductionSchedule)
    })

    test('Ensure getTopUpSummary is not called', () => {
      part3(reductionSchedule)
      expect(getTopUpSummary).not.toHaveBeenCalled()
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

    test('Ensure getTable is called', () => {
      part3(reductionZeroSchedule)
      expect(getTable).toHaveBeenCalled()
    })

    test('Ensure getTable is called once', () => {
      part3(reductionZeroSchedule)
      expect(getTable).toHaveBeenCalledTimes(1)
    })

    test('Ensure getTable is called with reductionZeroSchedule.schedule', () => {
      part3(reductionZeroSchedule)
      expect(getTable).toHaveBeenCalledWith(reductionZeroSchedule.schedule)
    })

    test('Ensure getReductionSummary is called', () => {
      part3(reductionZeroSchedule)
      expect(getReductionZeroSummary).toHaveBeenCalled()
    })

    test('Ensure getReductionZeroSummary is called once', () => {
      part3(reductionZeroSchedule)
      expect(getReductionZeroSummary).toHaveBeenCalledTimes(1)
    })

    test('Ensure getReductionZeroSummary is called with reductionZeroSchedule', () => {
      part3(reductionZeroSchedule)
      expect(getReductionZeroSummary).toHaveBeenCalledWith(reductionZeroSchedule)
    })

    test('Ensure getTopUpSummary is not called', () => {
      part3(reductionZeroSchedule)
      expect(getTopUpSummary).not.toHaveBeenCalled()
    })

    test('Ensure getReductionpSummary is not called', () => {
      part3(reductionZeroSchedule)
      expect(getReductionSummary).not.toHaveBeenCalled()
    })

    test('includes unbreakable instruction when reduction schedule', () => {
      const result = part3(reductionZeroSchedule)
      expect(result.unbreakable).toBeTruthy()
    })
  })
})
