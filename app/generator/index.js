const config = require('../config')

const PdfPrinter = require('pdfmake')
const moment = require('moment')

const { SCHEDULE } = require('../constants/document-types')

const getDocumentDefinition = require('./get-document-definition')
const publish = require('./publish')
const saveLog = require('./save-log')

const sendPublishMessage = require('../messaging/send-publish-message')
const sendCrmMessage = require('../messaging/crm/send-crm-message')

const fonts = require('./fonts')
const printer = new PdfPrinter(fonts)

const generateDocument = async (request, type) => {
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
}

module.exports = {
  generateDocument
}
