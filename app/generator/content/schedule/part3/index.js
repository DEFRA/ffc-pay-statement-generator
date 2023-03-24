const { getTable } = require('../part3/get-table')
const getHelpInfo = require('./get-help-info')

const part3 = (schedule) => {
  return {
    stack: [
      getTable(schedule.schedule),
      getHelpInfo()
    ],
    unbreakable: true
  }
}

module.exports = part3
