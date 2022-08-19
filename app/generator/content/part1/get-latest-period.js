const moment = require('moment')
const SETTLEMENT_DATE_FORMAT = 'DD MMMM YYYY'

const getLatestPeriod = (scheme, latestPayment) => {
  const period = scheme.frequency !== 'Quarterly' ? `for ${moment(latestPayment.settled, SETTLEMENT_DATE_FORMAT).format('MMMM YYYY')}` : getQuarterlyPeriod(latestPayment.dueDate)
  return period.includes('Invalid date') ? '' : period
}

const getQuarterlyPeriod = (dueDate) => {
  const firstMonth = moment(dueDate, SETTLEMENT_DATE_FORMAT)
  return `for ${firstMonth.format('MMMM')} to ${firstMonth.add(2, 'months').format('MMMM YYYY')}`
}

module.exports = getLatestPeriod
