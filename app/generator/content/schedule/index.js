const summary = require('./summary')

const createContent = (schedule) => {
  return [
    summary(schedule)
  ]
}

module.exports = createContent
