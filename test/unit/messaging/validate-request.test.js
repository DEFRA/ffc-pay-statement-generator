const { STATEMENT, SCHEDULE } = require('../../../app/constants/document-types')
const { topUpSchedule } = require('../../mocks/mock-schedule')

const { validateRequest } = require('../../../app/messaging/validate-request')

let statement

describe('validate statement', () => {
  beforeEach(() => {
    statement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
  })

  test('does not throw on valid statement', async () => {
    expect(() => validateRequest(statement, STATEMENT)).not.toThrow()
  })

  test('returns undefined on valid statement', async () => {
    statement.documentReference = ''
    const res = validateRequest(statement, STATEMENT)
    expect(res).toBeUndefined()
  })

  test('does not throw on statement with empty documentReference', async () => {
    statement.documentReference = ''
    expect(() => validateRequest(statement, STATEMENT)).not.toThrow()
  })

  test('returns undefined on statement with empty documentReference', async () => {
    statement.documentReference = ''
    const res = validateRequest(statement, STATEMENT)
    expect(res).toBeUndefined()
  })

  test('does not throw on statement with 255 character long documentReference', async () => {
    statement.documentReference = 'a'.repeat(255)
    expect(() => validateRequest(statement, STATEMENT)).not.toThrow()
  })

  test('returns undefined on statement with empty documentReference', async () => {
    statement.documentReference = 'a'.repeat(255)
    const res = validateRequest(statement, STATEMENT)
    expect(res).toBeUndefined()
  })

  test('throws on statement with no documentReference key', async () => {
    delete statement.documentReference
    expect(() => validateRequest(statement, STATEMENT)).toThrow()
  })

  test('throws on statement with numerical documentReference', async () => {
    statement.documentReference = 12345
    expect(() => validateRequest(statement, STATEMENT)).toThrow()
  })

  test('throws on statement with true documentReference', async () => {
    statement.documentReference = true
    expect(() => validateRequest(statement, STATEMENT)).toThrow()
  })

  test('throws on statement with object documentReference', async () => {
    statement.documentReference = {}
    expect(() => validateRequest(statement, STATEMENT)).toThrow()
  })

  test('throws on statement with array documentReference', async () => {
    statement.documentReference = []
    expect(() => validateRequest(statement, STATEMENT)).toThrow()
  })

  test('throws on statement with null documentReference', async () => {
    statement.documentReference = null
    expect(() => validateRequest(statement, STATEMENT)).toThrow()
  })

  test('throws on statement with undefined documentReference', async () => {
    statement.documentReference = undefined
    expect(() => validateRequest(statement, STATEMENT)).toThrow()
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

describe('validate schedule', () => {
  test('does not throw on valid schedule', async () => {
    expect(() => validateRequest(topUpSchedule, SCHEDULE)).not.toThrow()
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
