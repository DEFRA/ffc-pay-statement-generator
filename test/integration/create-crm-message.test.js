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
const { crmConfig } = require('../../app/config')
const createCrmMessage = require('../../app/messaging/crm/create-crm-message')
const mockStatement = require('../mocks/statement-data')
const BLOB_BASE_URL = 'https://devffcpayst1001.blob.core.windows.net/statements/outbound/'
const FILE_NAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

describe('send crm message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    crmConfig.blobBaseUrl = BLOB_BASE_URL
  })

  test('should throw Error when statement has no sbi ', async () => {
    mockStatement.sbi = null
    const wrapper = async () => {
      createCrmMessage(mockStatement, BLOB_BASE_URL, FILE_NAME)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw Error when statement has no frn ', async () => {
    mockStatement.frn = null
    const wrapper = async () => {
      createCrmMessage(mockStatement, BLOB_BASE_URL, FILE_NAME)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw Error when fileName is null ', async () => {
    mockStatement.frn = null
    const wrapper = async () => {
      createCrmMessage(mockStatement, BLOB_BASE_URL, null)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw Error when blobBaseUrl is null ', async () => {
    mockStatement.frn = null
    const wrapper = async () => {
      createCrmMessage(mockStatement, null, FILE_NAME)
    }

    expect(wrapper).rejects.toThrow(Error)
  })
})
