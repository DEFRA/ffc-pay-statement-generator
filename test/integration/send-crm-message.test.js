const mockSendMessage = jest.fn()
const mockCloseConnection = jest.fn()
jest.mock('ffc-messaging', () => {
  return {
    MessageSender: jest.fn().mockImplementation(() => {
      return {
        sendMessage: mockSendMessage,
        closeConnection: mockCloseConnection
      }
    })
  }
})
jest.mock('../../app/config')
const sendCrmMessage = require('../../app/messaging/crm/send-crm-message')
const mockStatement = require('../mocks/statement-data')
const BLOB_URL = 'https://myBlobStorageAccount.blob.core.windows.net/statements/outbound/FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

describe('send crm message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('sends one crm message', async () => {
    await sendCrmMessage(mockStatement, BLOB_URL)
    expect(mockSendMessage).toHaveBeenCalledTimes(1)
  })

  test('closes connection', async () => {
    await sendCrmMessage(mockStatement, BLOB_URL)
    expect(mockCloseConnection).toHaveBeenCalledTimes(1)
  })

  test('sends crm message with blobUrl', async () => {
    await sendCrmMessage(mockStatement, BLOB_URL)
    expect(mockSendMessage.mock.calls[0][0].body.blobUrl).toBe(BLOB_URL)
  })

  test('sends crm message with FRN', async () => {
    await sendCrmMessage(mockStatement, BLOB_URL)
    expect(mockSendMessage.mock.calls[0][0].body.frn).toBe(mockStatement.frn)
  })

  test('sends crm message with SBI', async () => {
    await sendCrmMessage(mockStatement, BLOB_URL)
    expect(mockSendMessage.mock.calls[0][0].body.sbi).toBe(mockStatement.sbi)
  })

  test('sends crm message with type', async () => {
    await sendCrmMessage(mockStatement, BLOB_URL)
    expect(mockSendMessage.mock.calls[0][0].type).toBe('uk.gov.pay.statement.crm')
  })

  test('sends crm message with source', async () => {
    await sendCrmMessage(mockStatement, BLOB_URL)
    expect(mockSendMessage.mock.calls[0][0].source).toBe('ffc-pay-statement-generator')
  })
})