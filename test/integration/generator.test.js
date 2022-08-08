const { BlobServiceClient } = require('@azure/storage-blob')
const config = require('../../app/config/storage')
const db = require('../../app/data')
const mockStatement = require('../mock-statement-data')
const processStatementMessage = require('../../app/messaging/process-statement-message')

const FILE_NAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

let blobServiceClient
let container
let receiver
let message

describe('generate statements', () => {
  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 7, 5, 15, 30, 10, 120))
    blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionStr)
    container = blobServiceClient.getContainerClient(config.container)
    await container.deleteIfExists()
    await container.createIfNotExists()
    await db.sequelize.truncate({ cascade: true })

    receiver = {
      completeMessage: jest.fn()
    }

    message = {
      body: mockStatement
    }
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('publishes statement to storage', async () => {
    await processStatementMessage(message, receiver)
    const fileList = []
    for await (const item of container.listBlobsFlat({ prefix: config.archiveFolder })) {
      fileList.push(item.name)
    }
    expect(fileList.filter(x => x === `${config.folder}/${FILE_NAME}`).length).toBe(1)
  })

  test('updates log', async () => {
    await processStatementMessage(message, receiver)
    const log = await db.generation.findOne({ where: { filename: `${FILE_NAME}` } })
    expect(log).not.toBeNull()
    expect(log.statementData).toStrictEqual(mockStatement)
    expect(log.dateGenerated).toStrictEqual(new Date(2022, 7, 5, 15, 30, 10, 120))
  })

  test('completes message', async () => {
    await processStatementMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalled()
  })
})
