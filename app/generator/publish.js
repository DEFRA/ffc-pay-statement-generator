const { getOutboundBlobClient } = require('../storage')
const createFilename = require('./create-filename')

const publish = (pdfDoc, statement, timestamp) => {
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

module.exports = publish
