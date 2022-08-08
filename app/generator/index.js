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
    defaultStyle: styles.default,
    pageMargins: [42.5197, 14.1732, 42.5197, 14.1732]
  }

  const timestamp = new Date()
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  const filename = await publish(pdfDoc, statement, moment(timestamp).format('YYYYMMDDHHmmssSS'))
  await createLog(statement, filename, timestamp)
}

module.exports = generateStatement
