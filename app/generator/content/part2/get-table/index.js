const mapFundingRows = require('./map-funding-rows')
const mapTotalRow = require('./map-total-row')

const getTable = (funding, reductions) => {
  return {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
      body: [
        [
          { text: 'Standard', style: 'tableHeader' },
          { text: 'Level', style: 'tableHeader' },
          { text: 'Rate', style: 'tableHeader' },
          { text: 'Land area (ha)', style: 'tableHeader' },
          { text: 'Annual value', style: 'tableHeader' },
          { text: 'Quarterly value', style: 'tableHeader' },
          { text: 'Quarterly reduction', style: 'tableHeader' },
          { text: 'Quarterly payment', style: 'tableHeader' }
        ],
        ...mapFundingRows(funding.filter(x => x.name !== 'Total'), reductions),
        mapTotalRow(funding.find(x => x.name === 'Total'))
      ]
    }
  }
}

module.exports = getTable
