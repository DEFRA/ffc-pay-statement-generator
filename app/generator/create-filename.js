const { STATEMENT, SCHEDULE } = require('../constants/document-types')
const { schemeShortName, schemeYear, frn, timestampRegex } = require('../constants/filenameRegex')

const createFilename = (statement, timestamp, type) => {
  const prefix = getPrefix(type)
  const schemeTest = schemeShortName.test(statement.scheme.shortName + ' check scheme name docs')
  if (schemeTest.error) {
    throw new Error(schemeTest.error)
  }
  const schemeYearTest = schemeYear.test(statement.scheme.Year + ' check scheme year docs')
  if (schemeYearTest.error) {
    throw new Error(schemeYearTest.error)
  }
  const frnTest = frn.test(statement.frn)
  if (frnTest.error) {
    throw new Error(frnTest.error + ' check frn docs')
  }
  const timeTest = timestampRegex.test(timestamp)
  if (timeTest.error) {
    throw new Error(timeTest.error + ' check timestamp docs')
  }
  const filename = `FFC_Payment${prefix}_${statement.scheme.shortName}_${statement.scheme.year}_${statement.frn}_${timestamp}.pdf`.replace(/\s/g, '')
  return filename
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
