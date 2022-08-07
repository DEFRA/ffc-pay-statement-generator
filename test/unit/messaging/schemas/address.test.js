const schema = require('../../../../app/messaging/schemas/address')
let mockAddress

describe('address schema', () => {
  beforeEach(() => {
    mockAddress = JSON.parse(JSON.stringify(require('../../../mock-statement-data').address))
  })
  test('validates success if all present', () => {
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })

  test('validates fail if missing postcode', () => {
    delete mockAddress.postcode
    const result = schema.validate(mockAddress)
    expect(result.error).toBeDefined()
  })

  test('validates success if missing line 1', () => {
    delete mockAddress.line1
    const result = schema.validate(mockAddress)
    expect(result.error).toBeUndefined()
  })
})
