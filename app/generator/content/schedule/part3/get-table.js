const toCurrencyString = require('../../../../generator/to-currency-string')

const getTable = (schedule) => {
  const table = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    fillColor: '#d9d9d9',
    table: {
      headerRows: 1,
      widths: ['*', ...schedule.map(x => ('*'))],
      body: [
        [
          { text: 'Payment type', style: 'tableHeader' },
          ...schedule.map(x => ({ text: x.paymentType, style: 'tableHeader' }))
        ],
        [
          { text: 'Amount', style: 'tableHeader' },
          ...schedule.map(x => ({ text: toCurrencyString(x.value), style: 'tableNumber' }))
        ],
        [
          { text: 'Payment period', style: 'tableHeader' },
          ...schedule.map(x => ({ text: x.period, style: 'tableNumber' }))
        ]
      ]
    }
  }

  return table
}

module.exports = {
  getTable
}
