const { BlobServiceClient } = require('@azure/storage-blob')

const config = require('../../../app/config/storage')
const db = require('../../../app/data')

const sendMessage = require('../../mocks/modules/ffc-messaging')

const { processMessage } = require('../../../app/messaging/process-message')

const { STATEMENT } = require('../../../app/constants/document-types')
const FILE_NAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

let blobServiceClient
let container

let receiver

let statement
let message

describe('process message', () => {
  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))

    blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionStr)
    container = blobServiceClient.getContainerClient(config.container)

    await container.deleteIfExists()
    await container.createIfNotExists()

    receiver = {
      completeMessage: jest.fn()
    }
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await db.sequelize.truncate({ cascade: true })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })

  describe('when message is a statement', () => {
    beforeEach(async () => {
      statement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))

      message = {
        body: statement,
        applicationProperties: {
          type: STATEMENT.type
        }
      }
    })

    describe('When statement has not been processed before', () => {
      test('should publish file with name FILE_NAME to archive blob storage location', async () => {
        await processMessage(message, receiver)

        const fileList = []
        for await (const item of container.listBlobsFlat({ prefix: config.archiveFolder })) {
          fileList.push(item.name)
        }
        expect(fileList).toContain(`${config.folder}/${FILE_NAME}`)
      })

      test('should save 1 log entry', async () => {
        await processMessage(message, receiver)

        const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
        expect(log).not.toBeNull()
      })

      test('should save log entry with statement data', async () => {
        await processMessage(message, receiver)

        const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
        delete statement.documentReference
        expect(log.statementData).toStrictEqual(statement)
      })

      test('should save log entry with statement data with no document reference', async () => {
        await processMessage(message, receiver)

        const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
        expect(Object.keys(message.body)).toContain('documentReference')
        expect(Object.keys(log.statementData)).not.toContain('documentReference')
      })

      test('should save log entry with document reference', async () => {
        await processMessage(message, receiver)

        const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
        expect(log.documentReference).toStrictEqual(message.body.documentReference)
      })

      test('should save log entry with generation date', async () => {
        await processMessage(message, receiver)

        const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
        expect(log.dateGenerated).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
      })

      test('should send 2 messages for publish and crm', async () => {
        await processMessage(message, receiver)
        expect(sendMessage).toHaveBeenCalledTimes(2)
      })

      test('should send publish message with statement filename', async () => {
        await processMessage(message, receiver)
        expect(sendMessage.mock.calls[0][0].body.filename).toBe(FILE_NAME)
      })

      test('should send crm message with statement api link that contains filename', async () => {
        await processMessage(message, receiver)
        expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(FILE_NAME)
      })

      test('should complete message', async () => {
        await processMessage(message, receiver)
        expect(receiver.completeMessage).toHaveBeenCalled()
      })
    })

    describe('When statement has been processed before', () => {
      beforeEach(async () => {
        statement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
        message = {
          body: statement,
          applicationProperties: {
            type: STATEMENT.type
          }
        }

        const { documentReference: documentRef, ...data } = statement

        await db.generation.create({
          statementData: data,
          documentReference: documentRef,
          filename: FILE_NAME,
          dateGenerated: new Date(2022, 7, 5, 15, 30, 10, 120)
        })
      })

      test('should not publish file with name FILE_NAME to archive blob storage location', async () => {
        await processMessage(message, receiver)

        const fileList = []
        for await (const item of container.listBlobsFlat({ prefix: config.archiveFolder })) {
          fileList.push(item.name)
        }
        expect(fileList).not.toContain(`${config.folder}/${FILE_NAME}`)
      })

      test('should not save another log entry', async () => {
        await processMessage(message, receiver)

        const log = await db.generation.findAll({ raw: true })
        expect(log).toHaveLength(1)
      })

      test('should not send messages for publish and crm', async () => {
        await processMessage(message, receiver)
        expect(sendMessage).not.toHaveBeenCalled()
      })

      test('should complete message', async () => {
        await processMessage(message, receiver)
        expect(receiver.completeMessage).toHaveBeenCalled()
      })
    })

    describe('When statement has null documentReference and nullls exist in table', () => {
      beforeEach(async () => {
        statement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
        message = {
          body: { ...statement, documentReference: null },
          applicationProperties: {
            type: STATEMENT.type
          }
        }

        const { documentReference: _, ...data } = statement

        await db.generation.create({
          statementData: data,
          documentReference: null,
          filename: FILE_NAME,
          dateGenerated: new Date(2022, 7, 5, 15, 30, 10, 120)
        })
      })

      test('should publish file with name FILE_NAME to archive blob storage location', async () => {
        await processMessage(message, receiver)

        const fileList = []
        for await (const item of container.listBlobsFlat({ prefix: config.archiveFolder })) {
          fileList.push(item.name)
        }
        expect(fileList).toContain(`${config.folder}/${FILE_NAME}`)
      })

      test('should save another log entry', async () => {
        await processMessage(message, receiver)

        const log = await db.generation.findAll({ raw: true })
        expect(log).toHaveLength(2)
      })

      test('should save log entry with statement data', async () => { // come back  to
        await processMessage(message, receiver)

        const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
        delete statement.documentReference
        expect(log.statementData).toStrictEqual(statement)
      })

      test('should save log entry with statement data with no document reference', async () => {
        await processMessage(message, receiver)

        const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
        expect(Object.keys(message.body)).toContain('documentReference')
        expect(Object.keys(log.statementData)).not.toContain('documentReference')
      })

      test('should save log entry with document reference', async () => {
        await processMessage(message, receiver)

        const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
        expect(log.documentReference).toStrictEqual(message.body.documentReference)
      })

      test('should save log entry with generation date', async () => {
        await processMessage(message, receiver)

        const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
        expect(log.dateGenerated).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
      })

      test('should send 2 messages for publish and crm', async () => {
        await processMessage(message, receiver)
        expect(sendMessage).toHaveBeenCalledTimes(2)
      })

      test('should send publish message with statement filename', async () => {
        await processMessage(message, receiver)
        expect(sendMessage.mock.calls[0][0].body.filename).toBe(FILE_NAME)
      })

      test('should send crm message with statement api link that contains filename', async () => {
        await processMessage(message, receiver)
        expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(FILE_NAME)
      })

      test('should complete message', async () => {
        await processMessage(message, receiver)
        expect(receiver.completeMessage).toHaveBeenCalled()
      })
    })
  })
})
