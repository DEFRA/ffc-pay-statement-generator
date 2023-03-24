const getReductionDescription = require('./get-reduction-description')
const getTopUpDescription = require('./get-top-up-description')

const part2 = (schedule) => {
  return schedule.adjustment.adjustmentValue > 0 ? getTopUpDescription(schedule) : getReductionDescription(schedule)
}

module.exports = part2
