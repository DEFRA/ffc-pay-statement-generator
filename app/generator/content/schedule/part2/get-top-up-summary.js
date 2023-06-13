const toCurrencyString = require('../../../../generator/to-currency-string')

const getTopUpSummary = (adjustment) => {
  return {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    table: {
      widths: ['*'],
      body: [
        [{
          stack: [
            `Current agreement value: ${toCurrencyString(adjustment.currentValue)}\n`,
            `New agreement value: ${toCurrencyString(adjustment.newValue)}\n`,
            `Top up amount: ${toCurrencyString(adjustment.adjustmentValue)}\n`
          ]

        }]
      ]
    }
  }
}

module.exports = getTopUpSummary
