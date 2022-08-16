const getTable = (statement) => {
  return {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      widths: ['*'],
      body: [
        [{
          stack: [
            { text: `Your ${statement.scheme.frequency.toLowerCase()} ${statement.scheme.shortName} payment for ${statement.payments[0].settled} is £${statement.payments[0].value}`, bold: true },
            `We will pay this into your account on ${statement.payments[0].settled}.`,
            {
              columns: [
                { width: 200, text: 'Calculation date:' },
                { width: '*', text: statement.payments[0].calculated }
              ],
              style: 'column',
              columnGap: 10
            }, {
              columns: [
                { width: 200, text: 'Payment reference number:' },
                { width: '*', text: statement.payments[0].reference }
              ],
              style: 'column',
              columnGap: 10
            }
          ]
        }]
      ]
    }
  }
}

module.exports = getTable