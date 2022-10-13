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
jest.mock('../../../app/config')
const { crmConfig } = require('../../../app/config')
jest.mock('../../../app/messaging/crm/crm-component-schema')
const schema = require('../../../app/messaging/crm/crm-component-schema')
jest.mock('../../../app/messaging/crm/create-crm-message')
const createCrmMessage = require('../../../app/messaging/crm/create-crm-message')

const sendCrmMessage = require('../../../app/messaging/crm/send-crm-message')
const mockStatement = require('../../mocks/statement-data')
const BLOB_BASE_URL = 'https://devffcpayst1001.blob.core.windows.net/statements/outbound/'
const FILE_NAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

let crmComponent
let crmMessage

describe('send crm message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    crmConfig.blobBaseUrl = BLOB_BASE_URL

    crmComponent = {
      sbi: mockStatement.sbi,
      frn: mockStatement.frn,
      blobBaseUrl: BLOB_BASE_URL,
      filename: FILE_NAME
    }

    crmMessage = {
      body: {
        sbi: mockStatement.sbi,
        frn: mockStatement.frn,
        blobUrl: BLOB_BASE_URL.concat(FILE_NAME)
      },
      type: 'uk.gov.pay.statement.crm',
      source: 'ffc-pay-statement-generator'
    }

    schema.validate.mockReturnValue({ value: crmComponent })
    createCrmMessage.mockResolvedValue(crmMessage)
  })

  test('should call createCrmMessage when statement and fileName are given', async () => {
    await sendCrmMessage(mockStatement, FILE_NAME)
    expect(createCrmMessage).toHaveBeenCalled()
  })

  test('should call createCrmMessage once when statement and fileName are given', async () => {
    await sendCrmMessage(mockStatement, FILE_NAME)
    expect(createCrmMessage).toHaveBeenCalledTimes(1)
  })

  test('should call createCrmMessage with statement, crmConfig.baseUrl and filename when statement and fileName are given', async () => {
    await sendCrmMessage(mockStatement, FILE_NAME)
    expect(createCrmMessage).toHaveBeenCalledWith(mockStatement, crmConfig.blobBaseUrl, FILE_NAME)
  })
})
