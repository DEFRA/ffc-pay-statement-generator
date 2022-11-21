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

jest.mock('../../../app/messaging/crm/crm-schema')
const schema = require('../../../app/messaging/crm/crm-schema')

const { ffcApiPath, statementReceiverEndpoint } = require('../../../app/config')
const createCrmMessage = require('../../../app/messaging/crm/create-crm-message')
const mockStatement = require('../../mocks/statement-data')
const BLOB_URL = 'https://myBlobStorageAccount.blob.core.windows.net/statements/outbound/FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'
const FILENAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

let crmValid
let crmMessage

describe('send crm message', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    crmValid = {
      sbi: mockStatement.sbi,
      frn: mockStatement.frn,
      blobUrl: BLOB_URL,
      apiLink: `${statementReceiverEndpoint}/${ffcApiPath}/statement?filename=${FILENAME}`
    }

    crmMessage = {
      body: {
        ...crmValid
      },
      type: 'uk.gov.pay.statement.crm',
      source: 'ffc-pay-statement-generator'
    }

    schema.validate.mockReturnValue({ value: crmValid })
  })

  test('should call schema.validate when statement and blobUrl are given', async () => {
    createCrmMessage(mockStatement, BLOB_URL, FILENAME)
    expect(schema.validate).toHaveBeenCalled()
  })

  test('should call schema.validate once when statement and blobUrl are given', async () => {
    createCrmMessage(mockStatement, BLOB_URL, FILENAME)
    expect(schema.validate).toHaveBeenCalledTimes(1)
  })

  test('should return valid message when statement and blobUrl are given', async () => {
    const result = createCrmMessage(mockStatement, BLOB_URL, FILENAME)
    expect(result).toStrictEqual(crmMessage)
  })

  test('should throw Error when schema validate throws Error', async () => {
    schema.validate.mockReturnValue({ error: 'Not a valid object' })

    const wrapper = async () => {
      createCrmMessage(mockStatement, BLOB_URL)
    }

    expect(wrapper).rejects.toThrow(Error)
  })
})
