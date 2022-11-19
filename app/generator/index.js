const PdfPrinter = require('pdfmake')
const moment = require('moment')
const fonts = require('./fonts')
const saveLog = require('./save-log')
const publish = require('./publish')
const getDefinition = require('./get-definition')
const sendPublishMessage = require('../messaging/send-publish-message')
const sendCrmMessage = require('../messaging/crm/send-crm-message')
const printer = new PdfPrinter(fonts)

const generateDocument = async (request, type) => {
  const docDefinition = getDefinition(request, type)
  const timestamp = new Date()
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  const { filename, blobUrl } = await publish(pdfDoc, request, moment(timestamp).format('YYYYMMDDHHmmssSS'), type)
  await sendPublishMessage(request, filename)
  await sendCrmMessage(request, blobUrl)
  await saveLog(request, filename, timestamp)
}

module.exports = generateDocument
