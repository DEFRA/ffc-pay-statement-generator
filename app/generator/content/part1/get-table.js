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
          text: `Your ${statement.scheme.frequency.toLowerCase()} payment for ${statement.scheme.name} was made on ${statement.payments[0].settled}.`,
          alignment: 'center',
          fillColor: '#eeeeee'
        }]
      ]
    }
  }
}

module.exports = getTable
