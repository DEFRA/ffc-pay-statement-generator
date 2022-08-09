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

const mapFundingRows = (funding, reductions) => {
  return funding.map(x => ([
    x.name,
    x.level,
    { text: x.rate, style: 'tableNumber' },
    { text: x.area, style: 'tableNumber' },
    { text: `£${x.annualValue}`, style: 'tableNumber' },
    { text: `£${x.quarterlyValue}`, style: 'tableNumber' },
    { text: `£${x.quarterlyReduction}${mapReductionIds(x.reductions, reductions)}`, style: 'tableNumber' },
    { text: `£${x.quarterlyPayment}`, style: 'tableNumber' }
  ]))
}

const mapTotalRow = (row) => {
  return [
    { text: row.name, bold: true },
    { text: row.level, bold: true },
    { text: row.rate, style: 'tableNumber', bold: true },
    { text: row.area, style: 'tableNumber', bold: true },
    { text: `£${row.annualValue}`, style: 'tableNumber', bold: true },
    { text: `£${row.quarterlyValue}`, style: 'tableNumber', bold: true },
    { text: `£${row.quarterlyReduction}`, style: 'tableNumber', bold: true },
    { text: `£${row.quarterlyPayment}`, style: 'tableNumber', bold: true }
  ]
}

const mapReductionIds = (fundReductions, reductions) => {
  if (!fundReductions || !fundReductions.length) {
    return ''
  }
  return `\n${(fundReductions.map(x => {
    const reduction = reductions.find(y => y.reason === x.reason)
    return `\n(${reduction.id})`
  })).join('')}`
}

module.exports = getTable
