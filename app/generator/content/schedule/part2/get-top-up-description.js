const getTopUpSummary = require('./get-top-up-summary')

const getTopUpDescription = (schedule) => {
  return {
    stack: [
      `\n\nWe recently sent you a letter to tell you the annual value of your ${schedule.scheme.name} (${schedule.scheme.shortName}) agreement has increased.`,
      '\nThe payment schedule sets out the payments you\'ll receive for the rest of the current scheme year.\n',
      '\nThe new annual value of your agreement will be split equally between 4 quarterly payments for the year. You may receive either or both of the following:\n\n',
      { ul: ['an immediate payment - this is a one-off amount which will be a top-up to any quarterly payments you\'ve already received for this scheme year', 'an increase to quarterly payments you\'ve not yet received'], listStyle: 'square' },
      { text: 'Payment schedule', style: 'header2' },
      'The table below explains when, and how much you\'ll be paid.\n\n',
      getTopUpSummary(schedule.adjustment)
    ],
    unbreakable: true
  }
}

module.exports = getTopUpDescription
