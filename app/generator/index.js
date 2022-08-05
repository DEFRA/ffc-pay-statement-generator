const PdfPrinter = require('pdfmake')
const statement = require('./mock-statement-data')
const fonts = require('./fonts')
const styles = require('./styles')
const generateContent = require('./content')
const createFilename = require('./create-filename')
const { getOutboundBlobClient } = require('../storage')

const printer = new PdfPrinter(fonts)

const generateStatement = async (_statement) => {
  const docDefinition = {
    pageSize: 'A4',
    content: generateContent(statement),
    styles,
    defaultStyle: styles.default
  }

  const filename = createFilename(statement)
  const blobClient = await getOutboundBlobClient(filename)
  const chunks = []
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  pdfDoc.on('data', chunk => chunks.push(chunk))
  pdfDoc.on('end', async () => {
    const result = Buffer.concat(chunks)
    await blobClient.upload(result, result.length)
  })
  pdfDoc.end()
}

module.exports = generateStatement
