const getSummary = require('../../common-template')

const part1 = (schedule) => {
  return {
    stack: [
      getSummary(),
      {
        text: `${schedule.scheme.name} (${schedule.scheme.shortName}) revised payment schedule `,
        style: 'h3'
      }
    ],
    unbreakable: true
  }
}

module.exports = part1
