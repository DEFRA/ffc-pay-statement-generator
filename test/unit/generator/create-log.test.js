const moment = require('moment')
const mockCreate = jest.fn()
jest.mock('../../../app/data', () => {
  return {
    generation: { create: mockCreate }
  }
})
const createLog = require('../../../app/generator/create-log')
const mockStatement = require('../../mock-statement-data')
let timestamp

describe('create log', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 12))
    timestamp = moment(new Date()).format('YYYYMMDDHHmmssSS')
  })

  test('creates new log with statement data', async () => {
    await createLog(mockStatement, 'test.pdf', timestamp)
    expect(mockCreate.mock.calls[0][0].statementData).toStrictEqual(mockStatement)
  })

  test('creates new log with generation time', async () => {
    await createLog(mockStatement, 'test.pdf', timestamp)
    expect(mockCreate.mock.calls[0][0].dateGenerated).toStrictEqual(timestamp)
  })

  test('creates new log with filename', async () => {
    await createLog(mockStatement, 'test.pdf', timestamp)
    expect(mockCreate.mock.calls[0][0].filename).toBe('test.pdf')
  })
})
