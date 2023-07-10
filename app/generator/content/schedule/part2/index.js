const getReductionDescription = require('./get-reduction-description')
const getTopUpDescription = require('./get-top-up-description')
const getReductionZeroDescription = require('./get-reduction-zero-description')

const part2 = (schedule) => {
  const remainingAmount = schedule.remainingAmount
  switch (true) {
    case (remainingAmount > 0):
      return schedule.adjustment.adjustmentValue > 0 ? getTopUpDescription(schedule) : getReductionDescription(schedule)
    case (remainingAmount === 0):
      return getReductionZeroDescription(schedule)
    case (remainingAmount < 0):
      getReductionDescription(schedule)
  }
}

module.exports = part2
