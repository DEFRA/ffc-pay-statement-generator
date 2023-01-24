const { STATEMENT, SCHEDULE } = require('../document-types')

const createFilename = (statement, timestamp, type) => {
  const prefix = getPrefix(type)
  return `FFC_Payment${prefix}_${statement.scheme.shortName}_${statement.scheme.year}_${statement.frn}_${timestamp}.pdf`.replace(/\s/g, '')
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
