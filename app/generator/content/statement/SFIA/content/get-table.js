const toCurrencyString = require('../../../../to-currency-string')
const getPaymentPeriod = require('./get-payment-period')

const getTable = (latestPayment) => {
  return {
    layout: {
      hLineStyle: () => 'none',
      vLineStyle: () => 'solid'
    },
    table: {
      widths: ['*'],
      body: [
        [{
          stack: [
            { text: 'As you have a SFI 2023 agreement starting before the end of the calendar year, you are receiving an early payment worth 25% of the value of your annual agreement.' },
            { text: ' Payment summary', bold: true },
            { text: `Your SFI agreement and management payment is £ ${toCurrencyString(latestPayment.value)}`, bold: true },
            getPaymentPeriod(latestPayment.period),
            { text: 'Payments are usually made within 2 working days of this statement.' }
          ]
        }]
      ]
    }
  }
}

module.exports = getTable
