const createMessage = require('../../../app/messaging/create-message')
const mockStatement = require('../../mocks/mock-statement')
const FILENAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'
const TEST_TYPE_ID = 'test-type-id'

let valid
let message

describe('send crm message for statement', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    valid = {
      businessName: mockStatement.businessName,
      sbi: mockStatement.sbi,
      frn: mockStatement.frn,
      address: mockStatement.address,
      email: mockStatement.email,
      filename: FILENAME,
      scheme: mockStatement.scheme
    }

    message = {
      body: {
        ...valid
      },
      type: `uk.gov.pay.${TEST_TYPE_ID}.publish`,
      source: 'ffc-pay-statement-generator'
    }
  })

  test('should return valid message when statement and filename are given', async () => {
    const result = createMessage(mockStatement, FILENAME, TEST_TYPE_ID)
    expect(result).toStrictEqual(message)
  })
})
