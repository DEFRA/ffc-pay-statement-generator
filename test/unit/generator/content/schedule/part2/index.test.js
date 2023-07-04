jest.mock('../../../../../../app/generator/content/schedule/part2/get-top-up-description')
const getTopUpDescription = require('../../../../../../app/generator/content/schedule/part2/get-top-up-description')

jest.mock('../../../../../../app/generator/content/schedule/part2/get-reduction-description')
const getReductionDescription = require('../../../../../../app/generator/content/schedule/part2/get-reduction-description')

jest.mock('../../../../../../app/generator/content/schedule/part2/get-reduction-zero-description')
const getReductionZeroDescription = require('../../../../../../app/generator/content/schedule/part2/get-reduction-zero-description')

jest.mock('../../../../../../app/generator/content/schedule/part2/get-recovery-description')
const getRecoveryDescription = require('../../../../../../app/generator/content/schedule/part2/get-recovery-description')

const part2 = require('../../../../../../app/generator/content/schedule/part2')

const { topUpSchedule, reductionSchedule, reductionZeroSchedule, recoverySchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule part 2', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Ensure top-up-schedule returns top-up description', () => {
    part2(topUpSchedule)
    expect(getTopUpDescription).toHaveBeenCalled()
  })

  test('Ensure reduction-schedule returns reduction description', () => {
    part2(reductionSchedule)
    expect(getReductionDescription).toHaveBeenCalled()
  })

  test('Ensure reduction-zero-schedule returns reduction-zero-description', () => {
    part2(reductionZeroSchedule)
    expect(getReductionZeroDescription).toHaveBeenCalled()
  })

  test('Ensure recovery-schedule returns recovery description', () => {
    part2(recoverySchedule)
    expect(getRecoveryDescription).toHaveBeenCalled()
  })

  test('Ensure top-up-schedule does not return reduction description', () => {
    part2(topUpSchedule)
    expect(getReductionDescription).not.toHaveBeenCalled()
  })

  test('Ensure reduction-schedule does not returns top-up description', () => {
    part2(reductionSchedule)
    expect(getTopUpDescription).not.toHaveBeenCalled()
  })
})
