const PdfPrinter = require('pdfmake')
const moment = require('moment')

const config = require('../config')
const db = require('../data')

const { SCHEDULE } = require('../constants/document-types')

const getGenerations = require('./get-generations')
const getDocumentDefinition = require('./get-document-definition')
const publish = require('./publish')
const saveLog = require('./save-log')

const sendPublishMessage = require('../messaging/send-publish-message')
const sendCrmMessage = require('../messaging/crm/send-crm-message')

const fonts = require('./fonts')
const printer = new PdfPrinter(fonts)

const generateDocument = async (request, type) => {
  const transaction = await db.sequelize.transaction()

  try {
    const existingDocument = await getGenerations(request.documentReference, transaction)

    if (existingDocument) {
      console.info(`Duplicate document received, skipping ${existingDocument.documentReference}`)
      await transaction.rollback()
    } else {
      const docDefinition = getDocumentDefinition(request, type)
      const timestamp = new Date()
      const pdfDoc = printer.createPdfKitDocument(docDefinition)
      const filename = await publish(pdfDoc, request, moment(timestamp).format('YYYYMMDDHHmmssSS'), type)

      if (type.type === SCHEDULE.type) {
        if (config.schedulesArePublished) {
          await sendPublishMessage(request, filename, type.id)
        }
      } else {
        await sendPublishMessage(request, filename, type.id)
      }

      await sendCrmMessage(request, filename, type)
      await saveLog(request, filename, timestamp)

      await transaction.commit()
    }
  } catch (error) {
    await transaction.rollback()
    throw (error)
  }
}

module.exports = {
  generateDocument
}
