const toCurrencyString = require('../../../../generator/to-currency-string')

const getReductionDescription = (schedule) => {
  return {
    stack: [
      `\n\nWe recently sent you a letter to tell you the annual value of your ${schedule.scheme.name} (${schedule.scheme.shortName})agreement has decreased.`,
      '\nThe payment schedule sets out the payments you\'ll receive for the rest of the current scheme year.\n',
      '\nPayments you\'ll receive will:\n\n',
      { ul: ['take account of money you\'ve already been paid', 'be paid to you in equal amounts over the remaining quarters for this scheme year'], listStyle: 'square' },
      { text: 'Payment schedule', style: 'header2' },
      'The table below explains when, and how much you\'ll be paid.\n',
      `\nCurrent agreement value: ${toCurrencyString(schedule.adjustment.currentValue)}\n`,
      `New agreement value: ${toCurrencyString(schedule.adjustment.newValue)}\n`,
      `Reduction amount: ${toCurrencyString(schedule.adjustment.adjustmentValue)}`
    ],
    unbreakable: true
  }
}

module.exports = getReductionDescription
