const moment = require('moment')
const { BlobServiceClient } = require('@azure/storage-blob')

const config = require('../../../app/config')
const db = require('../../../app/data')

const { STATEMENT, SCHEDULE } = require('../../../app/constants/document-types')

const { DATE, TIMESTAMP } = require('../../mocks/components/system-time')

const sendMessage = require('../../mocks/modules/ffc-messaging')

const { processMessage } = require('../../../app/messaging/process-message')

let blobServiceClient
let container

let receiver

let statement
let schedule

let message
let filename
let filenameSavedDown

describe('process message', () => {
  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(DATE)

    blobServiceClient = BlobServiceClient.fromConnectionString(config.storageConfig.connectionStr)
    container = blobServiceClient.getContainerClient(config.storageConfig.container)

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

  describe('When schedulesArePublished is false', () => {
    beforeEach(() => {
      config.schedulesArePublished = false
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

        filename = `FFC_PaymentStatement_SFI_2022_1234567890_${TIMESTAMP}.pdf`
      })

      describe('When statement has not been processed before', () => {
        test('should publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
        })

        test('should send crm message with statement api link that contains filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When statement has been processed before', () => {
        beforeEach(async () => {
          filenameSavedDown = filename.split('_').slice(0, 5).concat(`${moment(new Date()).subtract(1, 'days').format('YYYYMMDDHHmmssSS').pdf}`).join('_')

          const { documentReference: documentRef, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: filenameSavedDown,
            dateGenerated: moment(new Date()).subtract(1, 'days')
          })
        })

        test('should not publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).not.toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should not save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: filenameSavedDown } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).toBeNull()
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

      describe('When statement has null documentReference and nulls exist in table', () => {
        beforeEach(async () => {
          filenameSavedDown = filename.split('_').slice(0, 5).concat(`${moment(new Date()).subtract(1, 'days').format('YYYYMMDDHHmmssSS').pdf}`).join('_')

          const { documentReference: _, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: null,
            filename: filenameSavedDown,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: filenameSavedDown } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
        })

        test('should send crm message with statement api link that contains filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When statement has null documentReference and no nulls exist in table', () => {
        beforeEach(async () => {
          message = {
            body: { ...statement, documentReference: null },
            applicationProperties: {
              type: STATEMENT.type
            }
          }

          filenameSavedDown = filename.split('_').slice(0, 5).concat(`${moment(new Date()).subtract(1, 'days').format('YYYYMMDDHHmmssSS').pdf}`).join('_')

          const { documentReference: documentRef, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: filenameSavedDown,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: filenameSavedDown } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
        })

        test('should send crm message with statement api link that contains filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      // describe('When 2 statements are sent', () => {
      //   test('should publish 1 file to archive blob storage location', async () => {
      //     await processMessage(message, receiver)
      //     await processMessage(message, receiver)

      //     const fileList = []
      //     for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
      //       fileList.push(item.name)
      //     }
      //     expect(fileList).toHaveLength(1)
      //   })

      //   test('should publish file with name filename to archive blob storage location', async () => {
      //     await processMessage(message, receiver)
      //     await processMessage(message, receiver)

      //     const fileList = []
      //     for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
      //       fileList.push(item.name)
      //     }
      //     expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
      //   })

      //   test('should save 1 log entry', async () => {
      //     await processMessage(message, receiver)
      //     await processMessage(message, receiver)

      //     const log = await db.generation.findAll({ where: { documentReference: message.body.documentReference } })
      //     expect(log).toHaveLength(1)
      //   })

      //   test('should save log entry with statement data', async () => {
      //     await processMessage(message, receiver)
      //     await processMessage(message, receiver)

      //     const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
      //     delete statement.documentReference
      //     expect(log.statementData).toStrictEqual(statement)
      //   })

      //   test('should save log entry with statement data with no document reference', async () => {
      //     await processMessage(message, receiver)
      //     await processMessage(message, receiver)

      //     const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
      //     expect(Object.keys(message.body)).toContain('documentReference')
      //     expect(Object.keys(log.statementData)).not.toContain('documentReference')
      //   })

      //   test('should save log entry with document reference', async () => {
      //     await processMessage(message, receiver)
      //     await processMessage(message, receiver)

      //     const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
      //     expect(log.documentReference).toStrictEqual(message.body.documentReference)
      //   })

      //   test('should save log entry with generation date', async () => {
      //     await processMessage(message, receiver)
      //     await processMessage(message, receiver)

      //     const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
      //     expect(log.dateGenerated).toStrictEqual(new Date())
      //   })

      //   test('should send 2 messages for publish and crm', async () => {
      //     await processMessage(message, receiver)
      //     await processMessage(message, receiver)

      //     expect(sendMessage).toHaveBeenCalledTimes(2)
      //   })

      //   test('should send publish message with statement filename', async () => {
      //     await processMessage(message, receiver)
      //     await processMessage(message, receiver)

      //     expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
      //   })

      //   test('should send crm message with statement api link that contains filename', async () => {
      //     await processMessage(message, receiver)
      //     await processMessage(message, receiver)

      //     expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
      //   })

      //   test('should complete both  message', async () => {
      //     await processMessage(message, receiver)
      //     await processMessage(message, receiver)

      //     expect(receiver.completeMessage).toHaveBeenCalledTimes(2)
      //   })
      // })
    })
  })

  describe('When schedulesArePublished is true', () => {
    beforeEach(() => {
      config.schedulesArePublished = true
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

        filename = `FFC_PaymentStatement_SFI_2022_1234567890_${TIMESTAMP}.pdf`
      })

      describe('When statement has not been processed before', () => {
        test('should publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
        })

        test('should send crm message with statement api link that contains filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When statement has been processed before', () => {
        beforeEach(async () => {
          filenameSavedDown = filename.split('_').slice(0, 5).concat(`${moment(new Date()).subtract(1, 'days').format('YYYYMMDDHHmmssSS').pdf}`).join('_')

          const { documentReference: documentRef, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: filenameSavedDown,
            dateGenerated: moment(new Date()).subtract(1, 'days')
          })
        })

        test('should not publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).not.toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should not save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: filenameSavedDown } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).toBeNull()
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

      describe('When statement has null documentReference and nulls exist in table', () => {
        beforeEach(async () => {
          filenameSavedDown = filename.split('_').slice(0, 5).concat(`${moment(new Date()).subtract(1, 'days').format('YYYYMMDDHHmmssSS').pdf}`).join('_')

          const { documentReference: _, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: null,
            filename: filenameSavedDown,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: filenameSavedDown } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
        })

        test('should send crm message with statement api link that contains filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When statement has null documentReference and no nulls exist in table', () => {
        beforeEach(async () => {
          message = {
            body: { ...statement, documentReference: null },
            applicationProperties: {
              type: STATEMENT.type
            }
          }

          filenameSavedDown = filename.split('_').slice(0, 5).concat(`${moment(new Date()).subtract(1, 'days').format('YYYYMMDDHHmmssSS').pdf}`).join('_')

          const { documentReference: documentRef, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: filenameSavedDown,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: filenameSavedDown } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
        })

        test('should send crm message with statement api link that contains filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When 2 statements are sent', () => {
        test('should publish 1 file to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toHaveLength(1)
        })

        test('should publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findAll({ where: { documentReference: message.body.documentReference } })
          expect(log).toHaveLength(1)
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement filename', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
        })

        test('should send crm message with statement api link that contains filename', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
        })

        test('should complete both  message', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(receiver.completeMessage).toHaveBeenCalledTimes(2)
        })
      })
    })

    describe('when message is a schedule', () => {
      beforeEach(async () => {
        schedule = JSON.parse(JSON.stringify(require('../../mocks/mock-schedule').topUpSchedule))

        message = {
          body: schedule,
          applicationProperties: {
            type: SCHEDULE.type
          }
        }

        filename = `FFC_PaymentSchedule_SFI_2022_1234567890_${TIMESTAMP}.pdf`
      })

      describe('When schedule has not been processed before', () => {
        test('should publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log).not.toBeNull()
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with schedule filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
        })

        test('should send crm message with schedule api link that contains filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When schedule has been processed before', () => {
        beforeEach(async () => {
          filenameSavedDown = filename.split('_').slice(0, 5).concat(`${moment(new Date()).subtract(1, 'days').format('YYYYMMDDHHmmssSS').pdf}`).join('_')

          const { documentReference: documentRef, ...data } = schedule

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: filenameSavedDown,
            dateGenerated: moment(new Date()).subtract(1, 'days')
          })
        })

        test('should not publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).not.toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should not save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: filenameSavedDown } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).toBeNull()
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

      describe('When schedule has null documentReference and nulls exist in table', () => {
        beforeEach(async () => {
          filenameSavedDown = filename.split('_').slice(0, 5).concat(`${moment(new Date()).subtract(1, 'days').format('YYYYMMDDHHmmssSS').pdf}`).join('_')

          const { documentReference: _, ...data } = schedule

          await db.generation.create({
            statementData: data,
            documentReference: null,
            filename: filenameSavedDown,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: filenameSavedDown } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with schedule filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
        })

        test('should send crm message with schedule api link that contains filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When schedule has null documentReference and no nulls exist in table', () => {
        beforeEach(async () => {
          message = {
            body: { ...schedule, documentReference: null },
            applicationProperties: {
              type: SCHEDULE.type
            }
          }

          filenameSavedDown = filename.split('_').slice(0, 5).concat(`${moment(new Date()).subtract(1, 'days').format('YYYYMMDDHHmmssSS').pdf}`).join('_')

          const { documentReference: documentRef, ...data } = schedule

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: filenameSavedDown,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: filenameSavedDown } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with schedule filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
        })

        test('should send crm message with schedule api link that contains filename', async () => {
          await processMessage(message, receiver)
          expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When 2 schedules are sent', () => {
        test('should publish 1 file to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toHaveLength(1)
        })

        test('should publish file with name filename to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${filename}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findAll({ where: { documentReference: message.body.documentReference } })
          expect(log).toHaveLength(1)
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with schedule filename', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(sendMessage.mock.calls[0][0].body.filename).toBe(filename)
        })

        test('should send crm message with schedule api link that contains filename', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(filename)
        })

        test('should complete both messages', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(receiver.completeMessage).toHaveBeenCalledTimes(2)
        })
      })
    })
  })
})
