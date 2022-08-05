const PdfPrinter = require('pdfmake')
const moment = require('moment')
const fonts = require('./fonts')
const styles = require('./styles')
const generateContent = require('./content')
const createLog = require('./create-log')
const publish = require('./publish')
const printer = new PdfPrinter(fonts)

const generateStatement = async (statement) => {
  const docDefinition = {
    pageSize: 'A4',
    content: generateContent(statement),
    styles,
    defaultStyle: styles.default
  }

  const timestamp = moment().format('YYYYMMDDHHmmss')
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  const filename = await publish(pdfDoc, statement, timestamp)
  await createLog(statement, filename, timestamp)
}

module.exports = generateStatement
