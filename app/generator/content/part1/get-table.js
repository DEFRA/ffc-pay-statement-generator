const getCalculationDate = require('./get-calculation-date')
const getReference = require('./get-reference')

const getTable = (scheme, latestPayment, latestPeriod) => {
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
            { text: `Your ${scheme.frequency.toLowerCase()} ${scheme.shortName} payment ${latestPeriod} is £${latestPayment.value}`, bold: true },
            `\nWe will pay this into your account on ${latestPayment.settled}.\n\n`,
            getCalculationDate(latestPayment.calculated),
            getReference(latestPayment.reference)
          ],
          fillColor: '#d9d9d9'
        }]
      ]
    }
  }
}

module.exports = getTable
