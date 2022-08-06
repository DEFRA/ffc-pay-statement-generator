jest.mock('ffc-messaging')
jest.mock('../../../app/data')
const mockGenerator = jest.fn()
jest.mock('../../../app/generator', () => {
  return mockGenerator
})
const processStatementMessage = require('../../../app/messaging/process-statement-message')
const mockStatement = require('../../mock-statement-data')
let receiver

describe('process statement message', () => {
  beforeEach(() => {
    receiver = {
      completeMessage: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('completes message on success', async () => {
    const message = {
      body: mockStatement
    }
    await processStatementMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })

  test('does not complete message on error', async () => {
    const message = {
      body: mockStatement
    }
    mockGenerator.mockImplementation(() => { throw new Error('Unable to generate') })
    await processStatementMessage(message, receiver)
    expect(receiver.completeMessage).not.toHaveBeenCalledWith(message)
  })
})
