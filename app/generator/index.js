const PdfPrinter = require('pdfmake')
const moment = require('moment')
const fonts = require('./fonts')
const saveLog = require('./save-log')
const publish = require('./publish')
const getDefinition = require('./get-definition')
const printer = new PdfPrinter(fonts)

const generateStatement = async (statement) => {
  const docDefinition = getDefinition(statement)
  const timestamp = new Date()
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  const filename = await publish(pdfDoc, statement, moment(timestamp).format('YYYYMMDDHHmmssSS'))
  await saveLog(statement, filename, timestamp)
}

module.exports = generateStatement
