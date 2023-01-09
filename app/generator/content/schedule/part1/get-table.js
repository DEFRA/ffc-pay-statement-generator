const getTable = (schedule) => {
  const table = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['*', ...schedule.map(x => ('*'))],
      body: [
        [
          { text: 'Payment period', style: 'tableHeader' },
          ...schedule.map(x => ({ text: x.period, style: 'tableHeader' }))
        ],
        [
          { text: 'Payment amount', style: 'tableHeader' },
          ...schedule.map(x => ({ text: x.value, style: 'tableNumber' }))
        ],
        [
          { text: 'Payment due', style: 'tableHeader' },
          ...schedule.map(x => ({ text: x.dueDate, style: 'tableNumber' }))
        ]
      ]
    }
  }

  return table
}

module.exports = getTable
