const moment = require('moment')
const SETTLEMENT_DATE_FORMAT = 'DD MMMM YYYY'

const getLatestPeriod = (scheme, latestPayment) => {
  return scheme.frequency !== 'Quarterly' ? moment(latestPayment.settled, SETTLEMENT_DATE_FORMAT).format('MMMM YYYY') : getQuarterlyPeriod(latestPayment.dueDate)
}

const getQuarterlyPeriod = (dueDate) => {
  const firstMonth = moment(dueDate, SETTLEMENT_DATE_FORMAT)
  return `${firstMonth.format('MMMM')} to ${firstMonth.add(3, 'months').format('MMMM YYYY')}`
}

module.exports = getLatestPeriod
