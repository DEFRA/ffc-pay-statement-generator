const getSummary = require('../../summary-layout')

const part1 = (schedule) => {
  return {
    stack: [
      getSummary(),
      {
        text: `${schedule.scheme.name} (${schedule.scheme.shortName}) revised payment schedule `,
        style: 'header3'
      }
    ],
    unbreakable: true
  }
}

module.exports = part1
