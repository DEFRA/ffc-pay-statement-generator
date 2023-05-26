const { mockMessageSender } = require('../../../mocks/modules/ffc-messaging')

jest.mock('../../../../app/messaging/crm/create-crm-message')
const createCrmMessage = require('../../../../app/messaging/crm/create-crm-message')

const sendCrmMessage = require('../../../../app/messaging/crm/send-crm-message')

const { STATEMENT: STATEMENT_FILENAME, SCHEDULE: SCHEDULE_FILENAME } = require('../../../mocks/components/filename')
const { STATEMENT: STATEMENT_TYPE, SCHEDULE: SCHEDULE_TYPE } = require('../../../../app/constants/document-types')

let document
let filename
let type

describe('send CRM message', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when document is a statement', () => {
    beforeEach(() => {
      document = JSON.parse(JSON.stringify(require('../../../mocks/mock-statement')))
      filename = STATEMENT_FILENAME
      type = STATEMENT_TYPE

      createCrmMessage.mockReturnValue({ z: 1 })
    })

    test('should call createCrmMessage', async () => {
      await sendCrmMessage(document, filename, type)
      expect(createCrmMessage).toHaveBeenCalled()
    })

    test('should call createCrmMessage once', async () => {
      await sendCrmMessage(document, filename, type)
      expect(createCrmMessage).toHaveBeenCalledTimes(1)
    })

    test('should call createCrmMessage with document and filename', async () => {
      await sendCrmMessage(document, filename, type)
      expect(createCrmMessage).toHaveBeenCalledWith(document, filename, type)
    })

    test('should call mockMessageSender.sendMessage', async () => {
      await sendCrmMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalled()
    })

    test('should call mockMessageSender.sendMessage once', async () => {
      await sendCrmMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
    })

    test('should call mockMessageSender.sendMessage with document and filename', async () => {
      await sendCrmMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalledWith({ a: 1 })
    })

    test('should call mockMessageSender.closeConnection', async () => {
      await sendCrmMessage(document, filename, type)
      expect(mockMessageSender().closeConnection).toHaveBeenCalled()
    })

    test('should call mockMessageSender.closeConnection once', async () => {
      await sendCrmMessage(document, filename, type)
      expect(mockMessageSender().closeConnection).toHaveBeenCalledTimes(1)
    })
  })

  describe('when document is a schedule', () => {
    beforeEach(() => {
      document = JSON.parse(JSON.stringify(require('../../../mocks/mock-schedule')))
      filename = SCHEDULE_FILENAME
      type = SCHEDULE_TYPE

      createCrmMessage.mockReturnValue({ z: 1 })
    })

    test('should call createCrmMessage', async () => {
      await sendCrmMessage(document, filename, type)
      expect(createCrmMessage).toHaveBeenCalled()
    })

    test('should call createCrmMessage once', async () => {
      await sendCrmMessage(document, filename, type)
      expect(createCrmMessage).toHaveBeenCalledTimes(1)
    })

    test('should call createCrmMessage with document and filename', async () => {
      await sendCrmMessage(document, filename, type)
      expect(createCrmMessage).toHaveBeenCalledWith(document, filename, type)
    })

    test('should call mockMessageSender.sendMessage', async () => {
      await sendCrmMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalled()
    })

    test('should call mockMessageSender.sendMessage once', async () => {
      await sendCrmMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
    })

    test('should call mockMessageSender.sendMessage with document and filename', async () => {
      await sendCrmMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalledWith({ a: 1 })
    })

    test('should call mockMessageSender.closeConnection', async () => {
      await sendCrmMessage(document, filename, type)
      expect(mockMessageSender().closeConnection).toHaveBeenCalled()
    })

    test('should call mockMessageSender.closeConnection once', async () => {
      await sendCrmMessage(document, filename, type)
      expect(mockMessageSender().closeConnection).toHaveBeenCalledTimes(1)
    })
  })
})
