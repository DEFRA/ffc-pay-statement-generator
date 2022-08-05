const moment = require('moment')

const createFilename = (statement) => {
  return `FFC_PaymentStatement_${statement.scheme.shortName}_${statement.scheme.year}_${statement.frn}_${moment().format('YYYYMMDDHHmmss')}.pdf`.replace(/\s/g, '')
}

module.exports = createFilename
