const commonHeader = require('../../common-header')

const summary = (statement) => {
  return {
    stack: [
      commonHeader(),
      `\nThis statement explains your payment for the ${statement.scheme.name} (${statement.scheme.shortName}). It is made up of 3 parts.`,
      '\nPart 1 provides a summary of the most recent payment.',
      'Part 2 explains how we calculated the payment.',
      'Part 3 highlights where to go for more support.'
    ],
    unbreakable: true
  }
}

module.exports = summary
