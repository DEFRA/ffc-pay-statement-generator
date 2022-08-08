jest.mock('ffc-messaging')
jest.mock('../../../app/data')
const mockGenerator = jest.fn()
jest.mock('../../../app/generator', () => {
  return mockGenerator
})
const mockValidation = jest.fn()
jest.mock('../../../app/messaging/validate-statement', () => {
  return mockValidation
})
const processStatementMessage = require('../../../app/messaging/process-statement-message')
const mockStatement = require('../../mock-statement-data')
const { VALIDATION } = require('../../../app/errors')
let receiver

describe('process statement message', () => {
  beforeEach(() => {
    receiver = {
      completeMessage: jest.fn(),
      deadLetterMessage: jest.fn()
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
    expect(receiver.deadLetterMessage).not.toHaveBeenCalledWith(message)
  })

  test('dead letters message if validation error', async () => {
    const message = {
      body: mockStatement
    }
    mockValidation.mockImplementation(() => {
      const err = new Error('Validation error')
      err.category = VALIDATION
      throw err
    })
    await processStatementMessage(message, receiver)
    expect(receiver.completeMessage).not.toHaveBeenCalledWith(message)
    expect(receiver.deadLetterMessage).toHaveBeenCalledWith(message)
  })
})
