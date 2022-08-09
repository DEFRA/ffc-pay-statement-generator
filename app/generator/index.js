const PdfPrinter = require('pdfmake')
const moment = require('moment')
const fonts = require('./fonts')
const styles = require('./styles')
const generateContent = require('./content')
const saveLog = require('./save-log')
const publish = require('./publish')
const printer = new PdfPrinter(fonts)

const generateStatement = async (statement) => {
  const docDefinition = {
    pageSize: 'A4',
    content: generateContent(statement),
    styles,
    defaultStyle: styles.default
  }

  const timestamp = new Date()
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  const filename = await publish(pdfDoc, statement, moment(timestamp).format('YYYYMMDDHHmmssSS'))
  await saveLog(statement, filename, timestamp)
}

module.exports = generateStatement
