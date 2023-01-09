const part1 = require('./part1')
const summary = require('./summary')

const createContent = (schedule) => {
  return [
    summary(schedule),
    part1(schedule)
  ]
}

module.exports = createContent
