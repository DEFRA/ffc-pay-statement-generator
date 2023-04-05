jest.mock('../../../../../../app/generator/content/schedule/part2/get-top-up-description')
const getTopUpDescription = require('../../../../../../app/generator/content/schedule/part2/get-top-up-description')
jest.mock('../../../../../../app/generator/content/schedule/part2/get-reduction-description')
const getReductionDescription = require('../../../../../../app/generator/content/schedule/part2/get-reduction-description')

const part2 = require('../../../../../../app/generator/content/schedule/part2')

const mockSchedule = require('../../../../../mocks/mock-schedule')
const mockTopUpSchedule = mockSchedule
const mockReductionAdjustment = {
  currentValue: '1000.00',
  newValue: '750.00',
  adjustmentValue: '-250.00'
}

const mockReductionSchedule = {
  ...mockSchedule,
  adjustment: mockReductionAdjustment
}

describe('schedule part 2', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Ensure top-up-schedule returns top-up description', () => {
    part2(mockTopUpSchedule)
    expect(getTopUpDescription).toHaveBeenCalled()
  })

  test('Ensure reduction-schedule returns reduction description', () => {
    part2(mockReductionSchedule)
    expect(getReductionDescription).toHaveBeenCalled()
  })

  test('Ensure top-up-schedule does not return reduction description', () => {
    part2(mockTopUpSchedule)
    expect(getReductionDescription).not.toHaveBeenCalled()
  })

  test('Ensure reduction-schedule does not returns top-up description', () => {
    part2(mockReductionSchedule)
    expect(getTopUpDescription).not.toHaveBeenCalled()
  })
})
