const { STATEMENT_MESSAGE, SCHEDULE_MESSAGE } = require('../../../mocks/messages/publish')

const schema = require('../../../../app/messaging/publish/schema')

let publish

describe('publish schema', () => {
  describe('when publish is STATEMENT_MESSAGE', () => {
    beforeEach(() => {
      publish = STATEMENT_MESSAGE
    })

    test('returns an object', () => {
      const res = schema.validate(publish)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns publish for key "value"', () => {
      const res = schema.validate(publish)
      expect(res.value).toStrictEqual(publish)
    })
  })

  describe('when publish is SCHEDULE_MESSAGE', () => {
    beforeEach(() => {
      publish = SCHEDULE_MESSAGE
    })

    test('returns an object', () => {
      const res = schema.validate(publish)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns publish for key "value"', () => {
      const res = schema.validate(publish)
      expect(res.value).toStrictEqual(publish)
    })
  })

  describe('when publish is STATEMENT_MESSAGE with no body', () => {
    beforeEach(() => {
      delete STATEMENT_MESSAGE.body
      publish = STATEMENT_MESSAGE
    })

    test('returns an object', () => {
      const res = schema.validate(publish)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns publish for key "value"', () => {
      const res = schema.validate(publish)
      expect(res.value).toStrictEqual(publish)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(publish)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "any.required" for key "error.details[0].type"', () => {
      const res = schema.validate(publish)
      expect(res.error.details[0].type).toBe('any.required')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The publish message requires a message with a body" for key "error.details[0].message"', () => {
      const res = schema.validate(publish)
      expect(res.error.details[0].message).toBe('The publish message requires a message with a body.')
    })
  })

  describe('when publish is SCHEDULE_MESSAGE with no body', () => {
    beforeEach(() => {
      delete SCHEDULE_MESSAGE.body
      publish = SCHEDULE_MESSAGE
    })

    test('returns an object', () => {
      const res = schema.validate(publish)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns publish for key "value"', () => {
      const res = schema.validate(publish)
      expect(res.value).toStrictEqual(publish)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(publish)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "any.required" for key "error.details[0].type"', () => {
      const res = schema.validate(publish)
      expect(res.error.details[0].type).toBe('any.required')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The publish message requires a message with a body" for key "error.details[0].message"', () => {
      const res = schema.validate(publish)
      expect(res.error.details[0].message).toBe('The publish message requires a message with a body.')
    })
  })

  describe('when publish is null', () => {
    beforeEach(() => {
      publish = null
    })

    test('returns an object', () => {
      const res = schema.validate(publish)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns publish for key "value"', () => {
      const res = schema.validate(publish)
      expect(res.value).toBe(publish)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(publish)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "object.base" for key "error.details[0].type"', () => {
      const res = schema.validate(publish)
      expect(res.error.details[0].type).toBe('object.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The publish message must be an object" for key "error.details[0].message"', () => {
      const res = schema.validate(publish)
      expect(res.error.details[0].message).toBe('The publish message must be an object.')
    })
  })

  describe('when publish is undefined', () => {
    beforeEach(() => {
      publish = undefined
    })

    test('returns an object', () => {
      const res = schema.validate(publish)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns publish for key "value"', () => {
      const res = schema.validate(publish)
      expect(res.value).toBe(publish)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(publish)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "any.required" for key "error.details[0].type"', () => {
      const res = schema.validate(publish)
      expect(res.error.details[0].type).toBe('any.required')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(publish)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The publish message requires a message with a body" for key "error.details[0].message"', () => {
      const res = schema.validate(publish)
      expect(res.error.details[0].message).toBe('The publish message requires a message with a body.')
    })
  })
})
