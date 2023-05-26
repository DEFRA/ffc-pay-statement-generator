const { STATEMENT, SCHEDULE } = require('../../../mocks/components/filename')

const schema = require('../../../../app/messaging/schemas/filename')

let filename

describe('filename schema', () => {
  describe('when filename is STATEMENT', () => {
    beforeEach(() => {
      filename = STATEMENT
    })

    test('returns an object', () => {
      const res = schema.validate(filename)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns filename for key "value"', () => {
      const res = schema.validate(filename)
      expect(res.value).toBe(filename)
    })
  })

  describe('when filename is SCHEDULE', () => {
    beforeEach(() => {
      filename = SCHEDULE
    })

    test('returns an object', () => {
      const res = schema.validate(filename)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns filename for key "value"', () => {
      const res = schema.validate(filename)
      expect(res.value).toBe(filename)
    })
  })

  describe('when filename is "a"', () => {
    beforeEach(() => {
      filename = 'a'
    })

    test('returns an object', () => {
      const res = schema.validate(filename)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 1 key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toHaveLength(1)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns filename for key "value"', () => {
      const res = schema.validate(filename)
      expect(res.value).toBe(filename)
    })
  })

  describe('when filename is 0', () => {
    beforeEach(() => {
      filename = 0
    })

    test('returns an object', () => {
      const res = schema.validate(filename)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns filename for key "value"', () => {
      const res = schema.validate(filename)
      expect(res.value).toBe(filename)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(filename)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "string.base" for key "error.details[0].type"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].type).toBe('string.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The filename must be a string." for key "error.details[0].message"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].message).toBe('The filename must be a string.')
    })
  })

  describe('when filename is {}', () => {
    beforeEach(() => {
      filename = {}
    })

    test('returns an object', () => {
      const res = schema.validate(filename)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns filename for key "value"', () => {
      const res = schema.validate(filename)
      expect(res.value).toBe(filename)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(filename)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "string.base" for key "error.details[0].type"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].type).toBe('string.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The filename must be a string." for key "error.details[0].message"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].message).toBe('The filename must be a string.')
    })
  })

  describe('when filename is []', () => {
    beforeEach(() => {
      filename = []
    })

    test('returns an object', () => {
      const res = schema.validate(filename)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns filename for key "value"', () => {
      const res = schema.validate(filename)
      expect(res.value).toBe(filename)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(filename)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "string.base" for key "error.details[0].type"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].type).toBe('string.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The filename must be a string." for key "error.details[0].message"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].message).toBe('The filename must be a string.')
    })
  })

  describe('when filename is true', () => {
    beforeEach(() => {
      filename = true
    })

    test('returns an object', () => {
      const res = schema.validate(filename)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns filename for key "value"', () => {
      const res = schema.validate(filename)
      expect(res.value).toBe(filename)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(filename)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "string.base" for key "error.details[0].type"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].type).toBe('string.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The filename must be a string." for key "error.details[0].message"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].message).toBe('The filename must be a string.')
    })
  })

  describe('when filename is null', () => {
    beforeEach(() => {
      filename = null
    })

    test('returns an object', () => {
      const res = schema.validate(filename)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns filename for key "value"', () => {
      const res = schema.validate(filename)
      expect(res.value).toBe(filename)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(filename)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "string.base" for key "error.details[0].type"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].type).toBe('string.base')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The filename must be a string." for key "error.details[0].message"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].message).toBe('The filename must be a string.')
    })
  })

  describe('when filename is undefined', () => {
    beforeEach(() => {
      filename = undefined
    })

    test('returns an object', () => {
      const res = schema.validate(filename)
      expect(res).toBeInstanceOf(Object)
    })

    test('returns an object with 2 keys', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toHaveLength(2)
    })

    test('returns an object with "value" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('value')
    })

    test('returns filename for key "value"', () => {
      const res = schema.validate(filename)
      expect(res.value).toBe(filename)
    })

    test('returns an object with "error" key', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res)).toContain('error')
    })

    test('returns an Error for key "error"', () => {
      const res = schema.validate(filename)
      expect(res.error).toBeInstanceOf(Error)
    })

    test('returns an object with 4 keys for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toHaveLength(4)
    })

    test('returns an object with "type" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('type')
    })

    test('returns "any.required" for key "error.details[0].type"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].type).toBe('any.required')
    })

    test('returns an object with "message" key for key "error.details[0]"', () => {
      const res = schema.validate(filename)
      expect(Object.keys(res.error.details[0])).toContain('message')
    })

    test('returns "The filename is required." for key "error.details[0].message"', () => {
      const res = schema.validate(filename)
      expect(res.error.details[0].message).toBe('The filename is required.')
    })
  })
})
