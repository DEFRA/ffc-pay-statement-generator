const { STATEMENT, SCHEDULE } = require('../../../../app/constants/document-types')
const { generateContent } = require('../../../../app/generator/content')
const mockStatement = require('../../../mocks/mock-statement')
const { topUpSchedule } = require('../../../mocks/mock-schedule')

describe('generator content', () => {
  test('should throw error if unknown document type', () => {
    expect(() => generateContent({}, 'unknown')).toThrowError('Unknown request type: unknown')
  })

  test('should return statement content if statement', () => {
    const result = generateContent(mockStatement, STATEMENT)
    expect(result[0].stack[3].text).toBe('Payment statement')
  })

  test('should return schedule content if schedule', () => {
    const result = generateContent(topUpSchedule, SCHEDULE)
    expect(result[0].stack[3].text).toBe('Revised payment schedule')
  })
})
