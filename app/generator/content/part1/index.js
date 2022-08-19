const getLatestPayment = require('./get-latest-payment')
const getLatestPeriod = require('./get-latest-period')
const getTable = require('./get-table')

const part1 = (statement) => {
  const latestPayment = getLatestPayment(statement.payments)
  const latestPeriod = getLatestPeriod(statement.scheme, latestPayment)
  return {
    stack: [
      { text: 'Part 1. Payment summary', style: 'header2' },
      getTable(statement.scheme, latestPayment, latestPeriod)
    ],
    unbreakable: true
  }
}

module.exports = part1
