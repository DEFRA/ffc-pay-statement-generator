const validate = require('../../../app/messaging/validate')
const { STATEMENT } = require('../../../app/types')
const mockStatement = require('../../mocks/statement-data')

describe('validate message body can be processed as statement', () => {
  test('does not throw on valid statement', async () => {
    expect(() => validate(mockStatement, STATEMENT)).not.toThrow()
  })

  test('throws on undefined statement', async () => {
    expect(() => validate(undefined, STATEMENT)).toThrow()
  })

  test('throws on missing statement', async () => {
    expect(() => validate(STATEMENT)).toThrow()
  })

  test('throws on empty statement', async () => {
    expect(() => validate({}, STATEMENT)).toThrow()
  })

  test('throws on array statement', async () => {
    expect(() => validate([], STATEMENT)).toThrow()
  })

  test('throws on true statement', async () => {
    expect(() => validate(true, STATEMENT)).toThrow()
  })

  test('throws on false statement', async () => {
    expect(() => validate(false, STATEMENT)).toThrow()
  })

  test('throws on 0 statement', async () => {
    expect(() => validate(0, STATEMENT)).toThrow()
  })

  test('throws on 1 statement', async () => {
    expect(() => validate(1, STATEMENT)).toThrow()
  })

  test('throws on empty string statement', async () => {
    expect(() => validate('', STATEMENT)).toThrow()
  })

  test('throws on string statement', async () => {
    expect(() => validate('statement', STATEMENT)).toThrow()
  })
})
