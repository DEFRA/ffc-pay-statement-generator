const getSummary = require('../../common-template')
const summary = require('./summary')
const part1 = require('./part1')
const part2 = require('./part2')
const getHelpInfo = require('../get-help-info')

const createContent = (statement) => {
  return [
    getSummary(statement),
    summary(statement),
    part1(statement),
    part2(statement),
    getHelpInfo()
  ]
}

module.exports = {
  createContent
}
