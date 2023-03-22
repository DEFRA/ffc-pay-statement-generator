const config = require('../../../app/config')

const { SCHEDULE, STATEMENT } = require('../../../app/constants/document-types')

const { DATE: SYSTEM_TIME, TIMESTAMP: TIMESTAMP_SYSTEM_TIME } = require('../../mocks/components/system-time')

const MOCK_SCHEDULE = require('../../mocks/mock-schedule')
const MOCK_STATEMENT = require('../../mocks/mock-statement')

const {
  SCHEDULE: MOCK_SCHEDULE_FILENAME,
  STATEMENT: MOCK_STATEMENT_FILENAME
} = require('../../mocks/components/filename')

const { mockPdfPrinter } = require('../../mocks/objects/pdfPrinter')

jest.mock('../../../app/generator/get-document-definition')
const getDocumentDefinition = require('../../../app/generator/get-document-definition')

jest.mock('../../../app/generator/publish')
const publish = require('../../../app/generator/publish')

jest.mock('../../../app/messaging/send-publish-message')
const sendPublishMessage = require('../../../app/messaging/send-publish-message')

jest.mock('../../../app/messaging/crm/send-crm-message')
const sendCrmMessage = require('../../../app/messaging/crm/send-crm-message')

jest.mock('../../../app/generator/save-log')
const saveLog = require('../../../app/generator/save-log')

const { generateDocument } = require('../../../app/generator')

let request
let type

describe('Generate document', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(SYSTEM_TIME)

    getDocumentDefinition.mockReturnValue('docDef')
    sendPublishMessage.mockResolvedValue(undefined)
    sendCrmMessage.mockResolvedValue(undefined)
    saveLog.mockResolvedValue(undefined)
  })

  describe('When schedulesArePublished is false', () => {
    beforeEach(() => {
      config.schedulesArePublished = false
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('When document is a statement', () => {
      beforeEach(() => {
        publish.mockResolvedValue(MOCK_STATEMENT_FILENAME)

        request = MOCK_STATEMENT
        type = STATEMENT
      })

      test('should call getDocumentDefinition', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalled()
      })

      test('should call getDocumentDefinition once', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
      })

      test('should call getDocumentDefinition with request and type', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
      })

      test('should call mockPdfPrinter.createPdfKitDocument', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
      })

      test('should call mockPdfPrinter.createPdfKitDocument once', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
      })

      test('should call mockPdfPrinter.createPdfKitDocument with getDocumentDefinition', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
      })

      test('should call publish', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalled()
      })

      test('should call publish once', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalledTimes(1)
      })

      test('should call publish with mockPdfPrinter.createPdfKitDocument, request, TIMESTAMP_SYSTEM_TIME and type', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
      })

      test('should call sendPublishMessage', async () => {
        await generateDocument(request, type)
        expect(sendPublishMessage).toHaveBeenCalled()
      })

      test('should call sendPublishMessage once', async () => {
        await generateDocument(request, type)
        expect(sendPublishMessage).toHaveBeenCalledTimes(1)
      })

      test('should call sendPublishMessage with request, publish() and type.id', async () => {
        await generateDocument(request, type)
        expect(sendPublishMessage).toHaveBeenCalledWith(request, (await publish()), type.id)
      })

      test('should call sendCrmMessage', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalled()
      })

      test('should call sendCrmMessage once', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalledTimes(1)
      })

      test('should call sendCrmMessage with request, publish() and type', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalledWith(request, (await publish()), type)
      })

      test('should call saveLog', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalled()
      })

      test('should call saveLog once', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalledTimes(1)
      })

      test('should call saveLog with request, publish() and SYSTEM_TIME', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalledWith(request, (await publish()), SYSTEM_TIME)
      })
    })

    describe('When document is a schedule', () => {
      beforeEach(() => {
        publish.mockResolvedValue(MOCK_SCHEDULE_FILENAME)

        request = MOCK_SCHEDULE
        type = SCHEDULE
      })

      test('should call getDocumentDefinition', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalled()
      })

      test('should call getDocumentDefinition once', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
      })

      test('should call getDocumentDefinition with request and type', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
      })

      test('should call mockPdfPrinter.createPdfKitDocument', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
      })

      test('should call mockPdfPrinter.createPdfKitDocument once', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
      })

      test('should call mockPdfPrinter.createPdfKitDocument with getDocumentDefinition', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
      })

      test('should call publish', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalled()
      })

      test('should call publish once', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalledTimes(1)
      })

      test('should call publish with mockPdfPrinter.createPdfKitDocument, request, TIMESTAMP_SYSTEM_TIME and type', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
      })

      test('should not call sendPublishMessage', async () => {
        await generateDocument(request, type)
        expect(sendPublishMessage).not.toHaveBeenCalled()
      })

      test('should call sendCrmMessage', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalled()
      })

      test('should call sendCrmMessage once', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalledTimes(1)
      })

      test('should call sendCrmMessage with request, publish() and type', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalledWith(request, (await publish()), type)
      })

      test('should call saveLog', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalled()
      })

      test('should call saveLog once', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalledTimes(1)
      })

      test('should call saveLog with request, publish() and SYSTEM_TIME', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalledWith(request, (await publish()), SYSTEM_TIME)
      })
    })
  })

  describe('When schedulesArePublished is true', () => {
    beforeEach(() => {
      config.schedulesArePublished = true
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('When document is a statement', () => {
      beforeEach(() => {
        publish.mockResolvedValue(MOCK_STATEMENT_FILENAME)

        request = MOCK_STATEMENT
        type = STATEMENT
      })

      test('should call getDocumentDefinition', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalled()
      })

      test('should call getDocumentDefinition once', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
      })

      test('should call getDocumentDefinition with request and type', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
      })

      test('should call mockPdfPrinter.createPdfKitDocument', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
      })

      test('should call mockPdfPrinter.createPdfKitDocument once', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
      })

      test('should call mockPdfPrinter.createPdfKitDocument with getDocumentDefinition', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
      })

      test('should call publish', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalled()
      })

      test('should call publish once', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalledTimes(1)
      })

      test('should call publish with mockPdfPrinter.createPdfKitDocument, request, TIMESTAMP_SYSTEM_TIME and type', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
      })

      test('should call sendPublishMessage', async () => {
        await generateDocument(request, type)
        expect(sendPublishMessage).toHaveBeenCalled()
      })

      test('should call sendPublishMessage once', async () => {
        await generateDocument(request, type)
        expect(sendPublishMessage).toHaveBeenCalledTimes(1)
      })

      test('should call sendPublishMessage with request, publish() and type.id', async () => {
        await generateDocument(request, type)
        expect(sendPublishMessage).toHaveBeenCalledWith(request, (await publish()), type.id)
      })

      test('should call sendCrmMessage', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalled()
      })

      test('should call sendCrmMessage once', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalledTimes(1)
      })

      test('should call sendCrmMessage with request, publish() and type', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalledWith(request, (await publish()), type)
      })

      test('should call saveLog', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalled()
      })

      test('should call saveLog once', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalledTimes(1)
      })

      test('should call saveLog with request, publish() and SYSTEM_TIME', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalledWith(request, (await publish()), SYSTEM_TIME)
      })
    })

    describe('When document is a schedule', () => {
      beforeEach(() => {
        publish.mockResolvedValue(MOCK_SCHEDULE_FILENAME)

        request = MOCK_SCHEDULE
        type = SCHEDULE
      })

      test('should call getDocumentDefinition', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalled()
      })

      test('should call getDocumentDefinition once', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
      })

      test('should call getDocumentDefinition with request and type', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
      })

      test('should call mockPdfPrinter.createPdfKitDocument', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
      })

      test('should call mockPdfPrinter.createPdfKitDocument once', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
      })

      test('should call mockPdfPrinter.createPdfKitDocument with getDocumentDefinition', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
      })

      test('should call publish', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalled()
      })

      test('should call publish once', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalledTimes(1)
      })

      test('should call publish with mockPdfPrinter.createPdfKitDocument, request, TIMESTAMP_SYSTEM_TIME and type', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
      })

      test('should call sendPublishMessage', async () => {
        await generateDocument(request, type)
        expect(sendPublishMessage).toHaveBeenCalled()
      })

      test('should call sendPublishMessage once', async () => {
        await generateDocument(request, type)
        expect(sendPublishMessage).toHaveBeenCalledTimes(1)
      })

      test('should call sendPublishMessage with request, publish() and type.id', async () => {
        await generateDocument(request, type)
        expect(sendPublishMessage).toHaveBeenCalledWith(request, (await publish()), type.id)
      })

      test('should call sendCrmMessage', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalled()
      })

      test('should call sendCrmMessage once', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalledTimes(1)
      })

      test('should call sendCrmMessage with request, publish() and type', async () => {
        await generateDocument(request, type)
        expect(sendCrmMessage).toHaveBeenCalledWith(request, (await publish()), type)
      })

      test('should call saveLog', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalled()
      })

      test('should call saveLog once', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalledTimes(1)
      })

      test('should call saveLog with request, publish() and SYSTEM_TIME', async () => {
        await generateDocument(request, type)
        expect(saveLog).toHaveBeenCalledWith(request, (await publish()), SYSTEM_TIME)
      })
    })
  })
})
