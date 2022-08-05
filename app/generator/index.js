const PdfPrinter = require('pdfmake')
const fs = require('fs')
const statement = require('./mock-statement-data')
const fonts = require('./fonts')
const styles = require('./styles')
const generateContent = require('./content')
const createFilename = require('./create-filename')

const printer = new PdfPrinter(fonts)

const generateStatement = (_statement) => {
  const docDefinition = {
    pageSize: 'A4',
    content: generateContent(statement),
    styles,
    defaultStyle: styles.default
  }

  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  const filename = createFilename(statement)
  pdfDoc.pipe(fs.createWriteStream(`app/pdfs/${filename}`))
  pdfDoc.end()
}

module.exports = generateStatement
