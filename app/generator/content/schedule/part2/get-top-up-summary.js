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
            `\nCurrent agreement value: ${toCurrencyString(adjustment.currentValue)}\n`,
            `New agreement value: ${toCurrencyString(adjustment.newValue)}\n`,
            `Reduction amount: ${toCurrencyString(adjustment.adjustmentValue)}`
          ],
          fillColor: '#d9d9d9'
        }]
      ]
    }
  }
}

module.exports = getTopUpSummary
