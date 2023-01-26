const { getAdjustment } = require('./get-adjustment')
const { getTable } = require('./get-table')

const part1 = (schedule) => {
  return {
    stack: [
      { text: 'Payment schedule', style: 'header2' },
      getAdjustment(schedule.adjustment),
      getTable(schedule.schedule)
    ],
    unbreakable: true
  }
}

module.exports = part1
