const { millimetresToPoints } = require('../../../conversion')
const commonHeader = require('../../common-header')

const part1 = (schedule) => {
  return {
    stack: [
      commonHeader(),
      { text: `${schedule.scheme.name} (${schedule.scheme.shortName}) revised payment schedule `, style: 'h3' }
    ],
    unbreakable: true
  }
}

module.exports = part1
