jest.mock('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')
const getTopUpSummary = require('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')

jest.mock('../../../../../../app/generator/content/schedule/part3/get-reduction-summary')
const getReductionSummary = require('../../../../../../app/generator/content/schedule/part3/get-reduction-summary')

jest.mock('../../../../../../app/generator/content/schedule/part3/get-reduction-zero-summary')
const getReductionZeroSummary = require('../../../../../../app/generator/content/schedule/part3/get-reduction-zero-summary')

jest.mock('../../../../../../app/generator/content/schedule/part3/get-recovery-summary')
const getRecoverySummary = require('../../../../../../app/generator/content/schedule/part3/get-recovery-summary')

const getSummary = require('../../../../../../app/generator/content/schedule/part3/get-summary')

const { topUpSchedule, reductionSchedule, reductionZeroSchedule, recoverySchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule part 2', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Ensure top-up-schedule returns top-up summary', () => {
    getSummary(topUpSchedule)
    expect(getTopUpSummary).toHaveBeenCalled()
  })

  test('Ensure reduction-schedule returns reduction summary', () => {
    getSummary(reductionSchedule)
    expect(getReductionSummary).toHaveBeenCalled()
  })

  test('Ensure reduction-zero-schedule returns reduction-zero-summary', () => {
    getSummary(reductionZeroSchedule)
    expect(getReductionZeroSummary).toHaveBeenCalled()
  })

  test('Ensure recovery-schedule returns recovery summary', () => {
    getSummary(recoverySchedule)
    expect(getRecoverySummary).toHaveBeenCalled()
  })

  test('Ensure top-up-schedule does not return reduction summary', () => {
    getSummary(topUpSchedule)
    expect(getReductionSummary).not.toHaveBeenCalled()
  })

  test('Ensure reduction-schedule does not returns top-up summary', () => {
    getSummary(reductionSchedule)
    expect(getTopUpSummary).not.toHaveBeenCalled()
  })
})
