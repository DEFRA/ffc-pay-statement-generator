const getTable = (scheme, latestPayment) => {
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
            { text: `Your ${scheme.frequency.toLowerCase()} ${scheme.shortName} payment for ${latestPayment.settled} is £${latestPayment.value}`, bold: true },
            `\nWe will pay this into your account on ${latestPayment.settled}.\n\n`,
            {
              columns: [
                { width: 200, text: 'Calculation date:' },
                { width: '*', text: latestPayment.calculated }
              ],
              style: 'column',
              columnGap: 10
            }, {
              columns: [
                { width: 200, text: 'Payment reference number:' },
                { width: '*', text: latestPayment.reference }
              ],
              style: 'column',
              columnGap: 10
            }
          ],
          fillColor: '#d9d9d9'
        }]
      ]
    }
  }
}

module.exports = getTable
