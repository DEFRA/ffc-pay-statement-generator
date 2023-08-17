const getLatestPayment = require('./get-latest-payment')
const getTable = require('./get-table')

const part1 = (statement) => {
  const latestPayment = getLatestPayment(statement.payments)
  return {
    stack: [
      { text: 'Part 1. Payment summary', style: 'h2' },
      getTable(statement.scheme, latestPayment)
    ],
    unbreakable: true
  }
}

module.exports = part1
