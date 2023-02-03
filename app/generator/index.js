const PdfPrinter = require('pdfmake')
const moment = require('moment')
const fonts = require('./fonts')
const saveLog = require('./save-log')
const publish = require('./publish')
const getDocumentDefinition = require('./get-document-definition')
const sendPublishMessage = require('../messaging/send-publish-message')
const sendCrmMessage = require('../messaging/crm/send-crm-message')
const printer = new PdfPrinter(fonts)

const generateDocument = async (request, type) => {
  const docDefinition = getDocumentDefinition(request, type)
  const timestamp = new Date()
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  const filename = await publish(pdfDoc, request, moment(timestamp).format('YYYYMMDDHHmmssSS'), type)
  await sendPublishMessage(request, filename, type.id)
  await sendCrmMessage(request, filename, type)
  await saveLog(request, filename, timestamp)
}

module.exports = {
  generateDocument
}
