jest.mock('ffc-messaging')
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

  test('completes message', async () => {
    const message = {
      body: mockStatement
    }
    await processStatementMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })
})
