const { BlobServiceClient } = require('@azure/storage-blob')
const config = require('../../app/config/storage')
const db = require('../../app/data')

const sendMessage = require('../mocks/modules/ffc-messaging')

const { processMessage } = require('../../app/messaging/process-message')

const { STATEMENT } = require('../../app/constants/document-types')
const FILE_NAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

let blobServiceClient
let container

let receiver

let statement
let message

describe('process statement', () => {
  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))

    blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionStr)
    container = blobServiceClient.getContainerClient(config.container)

    await container.deleteIfExists()
    await container.createIfNotExists()

    receiver = {
      completeMessage: jest.fn()
    }

    statement = JSON.parse(JSON.stringify(require('../mocks/mock-statement')))

    message = {
      body: statement,
      applicationProperties: {
        type: STATEMENT.type
      }
    }
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await db.sequelize.truncate({ cascade: true })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })

  test('publishes PDF statement to blob storage outbound location', async () => {
    await processMessage(message, receiver)

    const fileList = []
    for await (const item of container.listBlobsFlat({ prefix: config.archiveFolder })) {
      fileList.push(item.name)
    }
    expect(fileList.filter(x => x === `${config.folder}/${FILE_NAME}`).length).toBe(1)
  })

  test('saves 1 log entry', async () => {
    await processMessage(message, receiver)

    const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
    expect(log).not.toBeNull()
  })

  test('saves log entry with statement data', async () => {
    await processMessage(message, receiver)

    const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
    delete statement.documentReference
    expect(log.statementData).toStrictEqual(statement)
  })

  test('saves log entry with statement data with no document reference', async () => {
    await processMessage(message, receiver)

    const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
    expect(Object.keys(message.body)).toContain('documentReference')
    expect(Object.keys(log.statementData)).not.toContain('documentReference')
  })

  test('saves log entry with document reference', async () => {
    await processMessage(message, receiver)

    const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
    expect(log.documentReference).toStrictEqual(message.body.documentReference)
  })

  test('saves log entry with generation date', async () => {
    await processMessage(message, receiver)
    const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
    expect(log.dateGenerated).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('completes message', async () => {
    await processMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalled()
  })

  test('sends 2 messages for publish and crm', async () => {
    await processMessage(message, receiver)
    expect(sendMessage).toHaveBeenCalledTimes(2)
  })

  test('sends publish message with statement filename', async () => {
    await processMessage(message, receiver)
    expect(sendMessage.mock.calls[0][0].body.filename).toBe(FILE_NAME)
  })

  test('sends crm message with statement api link that contains filename', async () => {
    await processMessage(message, receiver)
    expect(sendMessage.mock.calls[1][0].body.apiLink).toContain(FILE_NAME)
  })
})
