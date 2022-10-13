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

const createCrmMessage = require('../../../app/messaging/crm/create-crm-message')
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
  })

  test('should call schema.validate when statement, blobBaseUrl and fileName are given', async () => {
    createCrmMessage(mockStatement, crmConfig.blobBaseUrl, FILE_NAME)
    expect(schema.validate).toHaveBeenCalled()
  })

  test('should call schema.validate once when statement, blobBaseUrl and fileName are given', async () => {
    createCrmMessage(mockStatement, crmConfig.blobBaseUrl, FILE_NAME)
    expect(schema.validate).toHaveBeenCalledTimes(1)
  })

  test('should return valid message when statement, blobBaseUrl and fileName are given', async () => {
    const result = createCrmMessage(mockStatement, crmConfig.blobBaseUrl, FILE_NAME)
    expect(result).toStrictEqual(crmMessage)
  })

  test('should throw Error when schema validate throws Error', async () => {
    schema.validate.mockReturnValue({ error: 'Not a valid object' })

    const wrapper = async () => {
      createCrmMessage(mockStatement, crmConfig.blobBaseUrl, FILE_NAME)
    }

    expect(wrapper).rejects.toThrow(Error)
  })
})
