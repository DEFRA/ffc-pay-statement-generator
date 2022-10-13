const mockCloseConnection = jest.fn()
jest.mock('ffc-messaging', () => {
  return {
    MessageSender: jest.fn().mockImplementation(() => {
      return {
        sendMessage: () => { throw new Error('Unable to send message') },
        closeConnection: mockCloseConnection
      }
    })
  }
})
jest.mock('../../app/config')
const { crmConfig } = require('../../app/config')
jest.mock('../../app/messaging/crm/create-crm-message')
const createCrmMessage = require('../../app/messaging/crm/create-crm-message')
jest.mock('../../app/messaging/crm/send-crm-message-retry-exhausted')
const sendCrmMessageRetryExhausted = require('../../app/messaging/crm/send-crm-message-retry-exhausted')

const sendCrmMessage = require('../../app/messaging/crm/send-crm-message')
const mockStatement = require('../mocks/statement-data')
const BLOB_BASE_URL = 'https://devffcpayst1001.blob.core.windows.net/statements/outbound/'
const FILE_NAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'
const SEND_RETRY_INTERVAL = 500
const SEND_RETRY_NO_OF_TIMES = 4

describe('sends n + 1 crm-message on error where n is number of retry', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    crmConfig.blobBaseUrl = BLOB_BASE_URL
    crmConfig.sendRetryInterval = SEND_RETRY_INTERVAL
    crmConfig.sendRetryNoOfTimes = SEND_RETRY_NO_OF_TIMES
  })

  test('On sendMessage failure should call createCrmMessage n + 1 ', async () => {
    await sendCrmMessage(mockStatement, FILE_NAME)
    expect(createCrmMessage).toHaveBeenCalledTimes(SEND_RETRY_NO_OF_TIMES + 1)
  })

  test('On sendMessage failure should call sendCrmMessageRetryExhausted after  n + 1 attempts', async () => {
    await sendCrmMessage(mockStatement, FILE_NAME)
    expect(sendCrmMessageRetryExhausted).toHaveBeenCalledTimes(1)
  })

  test('On sendMessage failure should call sendCrmMessageRetryExhausted with statement, filename and trialNo after  n + 1 attempts', async () => {
    await sendCrmMessage(mockStatement, FILE_NAME)
    expect(sendCrmMessageRetryExhausted).toHaveBeenCalledWith(mockStatement, FILE_NAME, SEND_RETRY_NO_OF_TIMES + 1)
  })
})
