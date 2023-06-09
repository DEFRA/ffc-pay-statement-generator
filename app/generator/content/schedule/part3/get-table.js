const toCurrencyString = require('../../../../generator/to-currency-string')
const { IMMEDIATE } = require('../../../../../app/constants/payment-types')

const getTable = (schedule) => {
  const rowsCount = schedule.length + 1
  const table = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    fillColor: '#d9d9d9',
    table: {
      headerRows: 1,
      widths: ['*', '*', '*'],
      body: [
        [
          { text: 'Payment type', style: 'tableHeader' },
          { text: 'Payment period', style: 'tableHeader' },
          { text: 'Amount', style: 'tableHeader' }
        ],
        ...schedule.map(x => ([
          { rowSpan: getRowSpan(x.paymentType, rowsCount, x.order), text: x.paymentType, style: 'tableNumber' },
          { text: x.period, style: 'tableNumber' },
          { text: toCurrencyString(x.value), style: 'tableNumber' }
        ]))
      ]
    }
  }

  return table
}

const getRowSpan = (paymentType, rowsCount, order) => {
  return paymentType === IMMEDIATE ? 1 : rowsCount - Number(order)
}

module.exports = {
  getTable
}
