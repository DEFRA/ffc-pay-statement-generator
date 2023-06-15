jest.mock('../../../../../../app/generator/content/schedule/part3/get-table')
const { getTable } = require('../../../../../../app/generator/content/schedule/part3/get-table')
jest.mock('../../../../../../app/generator/content/schedule/part3/get-reduction-summary')
const getReductionSummary = require('../../../../../../app/generator/content/schedule/part3/get-reduction-summary')
jest.mock('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')
const getTopUpSummary = require('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')

const part3 = require('../../../../../../app/generator/content/schedule/part3')

const { topUpSchedule, reductionSchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule part 3', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Ensure top-up summary header style is set to header3', () => {
    const result = part3(topUpSchedule)
    expect(result.stack[0].style).toBe('header3')
  })

  test('Ensure top-up summary title text is "Payment schedule"', () => {
    const result = part3(topUpSchedule)
    expect(result.stack[0].text).toBe('Payment schedule')
  })

  test('Ensure reduction summary header style is set to header3', () => {
    const result = part3(reductionSchedule)
    expect(result.stack[0].style).toBe('header3')
  })

  test('Ensure reduction summary title text is "Payment schedule"', () => {
    const result = part3(reductionSchedule)
    expect(result.stack[0].text).toBe('Payment schedule')
  })

  test('Ensure top-up-schedule returns top-up summary', () => {
    part3(topUpSchedule)
    expect(getTopUpSummary).toHaveBeenCalled()
  })

  test('Ensure top-up-schedule returns payment table', () => {
    part3(topUpSchedule)
    expect(getTable).toHaveBeenCalled()
  })

  test('Ensure reduction-schedule returns payment table', () => {
    part3(reductionSchedule)
    expect(getTable).toHaveBeenCalled()
  })

  test('Ensure reduction-schedule returns reduction summary', () => {
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

  test('Ensure top-up-schedule does not return reduction summary', () => {
    part3(topUpSchedule)
    expect(getReductionSummary).not.toHaveBeenCalled()
  })

  test('Ensure reduction-schedule does not returns top-up summary', () => {
    part3(reductionSchedule)
    expect(getTopUpSummary).not.toHaveBeenCalled()
  })
})
