const { validateRequest } = require('../../../app/messaging/validate-request')
const { STATEMENT, SCHEDULE } = require('../../../app/document-types')
const mockStatement = require('../../mocks/mock-statement')
const mockSchedule = require('../../mocks/mock-schedule')

describe('validate message body can be processed as statement', () => {
  test('does not throw on valid statement', async () => {
    expect(() => validateRequest(mockStatement, STATEMENT)).not.toThrow()
  })

  test('throws on undefined statement', async () => {
    expect(() => validateRequest(undefined, STATEMENT)).toThrow()
  })

  test('throws on missing statement', async () => {
    expect(() => validateRequest(STATEMENT)).toThrow()
  })

  test('throws on empty statement', async () => {
    expect(() => validateRequest({}, STATEMENT)).toThrow()
  })

  test('throws on array statement', async () => {
    expect(() => validateRequest([], STATEMENT)).toThrow()
  })

  test('throws on true statement', async () => {
    expect(() => validateRequest(true, STATEMENT)).toThrow()
  })

  test('throws on false statement', async () => {
    expect(() => validateRequest(false, STATEMENT)).toThrow()
  })

  test('throws on 0 statement', async () => {
    expect(() => validateRequest(0, STATEMENT)).toThrow()
  })

  test('throws on 1 statement', async () => {
    expect(() => validateRequest(1, STATEMENT)).toThrow()
  })

  test('throws on empty string statement', async () => {
    expect(() => validateRequest('', STATEMENT)).toThrow()
  })

  test('throws on string statement', async () => {
    expect(() => validateRequest('statement', STATEMENT)).toThrow()
  })
})

describe('validate message body can be processed as schedule', () => {
  test('does not throw on valid schedule', async () => {
    expect(() => validateRequest(mockSchedule, SCHEDULE)).not.toThrow()
  })

  test('throws on undefined schedule', async () => {
    expect(() => validateRequest(undefined, SCHEDULE)).toThrow()
  })

  test('throws on missing schedule', async () => {
    expect(() => validateRequest(SCHEDULE)).toThrow()
  })

  test('throws on empty schedule', async () => {
    expect(() => validateRequest({}, SCHEDULE)).toThrow()
  })

  test('throws on array schedule', async () => {
    expect(() => validateRequest([], SCHEDULE)).toThrow()
  })

  test('throws on true schedule', async () => {
    expect(() => validateRequest(true, SCHEDULE)).toThrow()
  })

  test('throws on false schedule', async () => {
    expect(() => validateRequest(false, SCHEDULE)).toThrow()
  })

  test('throws on 0 schedule', async () => {
    expect(() => validateRequest(0, SCHEDULE)).toThrow()
  })

  test('throws on 1 schedule', async () => {
    expect(() => validateRequest(1, SCHEDULE)).toThrow()
  })

  test('throws on empty string schedule', async () => {
    expect(() => validateRequest('', SCHEDULE)).toThrow()
  })

  test('throws on string schedule', async () => {
    expect(() => validateRequest('schedule', SCHEDULE)).toThrow()
  })
})
