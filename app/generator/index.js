const PdfPrinter = require('pdfmake')
const fs = require('fs')
const statement = require('./mock-statement-data')
const fonts = require('./fonts')
const styles = require('./styles')
const generateContent = require('./content')

const printer = new PdfPrinter(fonts)

const generateStatement = (_statement) => {
  const docDefinition = {
    pageSize: 'A4',
    content: generateContent(statement),
    styles,
    defaultStyle: 'default'
  }

  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  pdfDoc.pipe(fs.createWriteStream('app/pdfs/payment-statement.pdf'))
  pdfDoc.end()
}

module.exports = generateStatement
