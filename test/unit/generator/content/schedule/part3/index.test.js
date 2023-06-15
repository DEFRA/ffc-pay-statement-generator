jest.mock('../../../../../../app/generator/content/schedule/part3/get-table')
// const { getTable } = require('../../../../../../app/generator/content/schedule/part3/get-table')
jest.mock('../../../../../../app/generator/content/schedule/part3/get-reduction-summary')
const getReductionSummary = require('../../../../../../app/generator/content/schedule/part3/get-reduction-summary')
jest.mock('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')
const getTopUpSummary = require('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')

const part3 = require('../../../../../../app/generator/content/schedule/part3')

const { topUpSchedule, reductionSchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule part 2', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Ensure top-up-schedule returns top-up description', () => {
    part3(topUpSchedule)
    expect(getTopUpSummary).toHaveBeenCalled()
  })

  test('Ensure reduction-schedule returns reduction description', () => {
    part3(reductionSchedule)
    expect(getReductionSummary).toHaveBeenCalled()
  })

  test('includes unbreakable instruction when top up schedule', () => {
    const result = part3(topUpSchedule)
    expect(result.unbreakable).toBeTruthy()
  })

  test('includes unbreakable instruction when reduction schedule', () => {
    const result = part3(reductionSchedule)
    expect(result.unbreakable).toBeTruthy()
  })

  test('Ensure top-up-schedule does not return reduction description', () => {
    part3(topUpSchedule)
    expect(getReductionSummary).not.toHaveBeenCalled()
  })

  test('Ensure reduction-schedule does not returns top-up description', () => {
    part3(reductionSchedule)
    expect(getTopUpSummary).not.toHaveBeenCalled()
  })
})
