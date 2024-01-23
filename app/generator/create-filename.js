const { STATEMENT, SCHEDULE } = require('../constants/document-types')

const createFilename = (statement, timestamp, type) => {
  const prefix = getPrefix(type)
  const filename = `FFC_Payment${prefix}_${statement.scheme.shortName}_${statement.scheme.year}_${statement.frn}_${timestamp}.pdf`.replace(/\s/g, '')
  const filenameIsValid = /^[A-Z]{3,6}_[A-Z]([A-Z0-9]*[a-z][a-z0-9]*[A-Z]|[a-z0-9]*[A-Z][A-Z0-9]*[a-z])[A-Za-z0-9]*_[A-Z]{3,6}_\d{4}_\d{10}_\d{16}\.pdf$/
  if (filenameIsValid.test(filename)) {
    return filename
  } else if (!filenameIsValid.test(filename)) {
    throw new Error('Filename does not meet the correct format')
  }
}
const getPrefix = (type) => {
  switch (type) {
    case STATEMENT:
      return 'Statement'
    case SCHEDULE:
      return 'Schedule'
    default:
      return 'Document'
  }
}

module.exports = createFilename
