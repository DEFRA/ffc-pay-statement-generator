const getTable = require('./get-table')

const part1 = (statement) => {
  return {
    stack: [
      { text: 'Part 1. Payment summary', style: 'header2' },
      getTable(statement)
    ],
    unbreakable: true
  }
}

module.exports = part1
