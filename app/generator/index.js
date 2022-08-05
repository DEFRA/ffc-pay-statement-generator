const PdfPrinter = require('pdfmake')
const fonts = require('./fonts')
const styles = require('./styles')
const generateContent = require('./content')
const createFilename = require('./create-filename')
const { getOutboundBlobClient } = require('../storage')
const createLog = require('./create-log')

const printer = new PdfPrinter(fonts)

const generateStatement = async (statement) => {
  const docDefinition = {
    pageSize: 'A4',
    content: generateContent(statement),
    styles,
    defaultStyle: styles.default
  }

  const filename = createFilename(statement)
  const blobClient = await getOutboundBlobClient(filename)
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  const chunks = []
  pdfDoc.on('data', chunk => chunks.push(chunk))
  pdfDoc.on('end', async () => {
    const result = Buffer.concat(chunks)
    await blobClient.upload(result, result.length)
    await createLog(statement, filename)
    console.log(`Generated statement: ${filename}`)
  })
  pdfDoc.end()
}

module.exports = generateStatement
