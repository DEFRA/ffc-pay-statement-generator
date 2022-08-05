const PdfPrinter = require('pdfmake')
const fonts = require('./fonts')
const styles = require('./styles')
const generateContent = require('./content')
const createFilename = require('./create-filename')
const { getOutboundBlobClient } = require('../storage')
const createLog = require('./create-log')
const moment = require('moment')

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
  const filename = await publishPDF(pdfDoc, statement, timestamp)
  await createLog(statement, filename, timestamp)
}

const publishPDF = (pdfDoc, statement, timestamp) => {
  pdfDoc.end()
  const filename = createFilename(statement, timestamp)
  return new Promise((resolve, reject) => {
    const chunks = []
    pdfDoc.on('data', chunk => chunks.push(chunk))
    pdfDoc.on('end', async () => {
      await uploadToStorage(chunks, filename)
      resolve(filename)
    })
    pdfDoc.on('error', (err) => reject(err))
  })
}

const uploadToStorage = async (chunks, filename) => {
  const result = Buffer.concat(chunks)
  const blobClient = await getOutboundBlobClient(filename)
  await blobClient.upload(result, result.length)
  console.log(`Generated statement: ${filename}`)
}

module.exports = generateStatement
