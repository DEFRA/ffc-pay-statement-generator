const { getTable } = require('./get-table')
const getReductionSummary = require('./get-reduction-summary')
const getTopUpSummary = require('./get-top-up-summary')

const part3 = (schedule) => {
  return {
    stack: [
      { text: 'Payment schedule', style: 'header3' },
      schedule.adjustment.adjustmentValue > 0 ? getTopUpSummary(schedule.adjustment) : getReductionSummary(schedule),
      getTable(schedule.schedule)
    ],
    unbreakable: true
  }
}

module.exports = part3
