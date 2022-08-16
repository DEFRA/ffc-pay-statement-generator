const moment = require('moment')
const SETTLEMENT_DATE_FORMAT = 'DD MMMM YYYY'

const getLatestPayment = (payments) => {
  return payments.reduce((x, y) => {
    return moment(x.settled, SETTLEMENT_DATE_FORMAT) > moment(y.settled, SETTLEMENT_DATE_FORMAT) ? x : y
  })
}

module.exports = getLatestPayment
