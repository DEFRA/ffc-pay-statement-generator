const part2 = (statement) => {
  const reductions = mapReductions(statement.funding)

  return [
    { text: 'Part 2. Calculation', style: 'header2' },
    { text: `We calculated the total ${statement.scheme.shortName} payment amount by adding together payments for all the standards which are part of your agreement, as shown in this table.` },
    getTable(statement.funding, reductions),
    {
      text: [
        'You can check which land parcels are part of each standard in the Rural Payments service at ',
        { text: 'www.gov.uk/claim-rural-payments', link: 'https://www.gov.uk/claim-rural-payments', style: 'link' },
        '.'
      ]
    },
    ...getReductions(reductions)
  ]
}

const mapReductions = (funding) => {
  const reductions = []
  let i = 1
  funding.forEach(x => {
    if (x.reductions) {
      x.reductions.forEach(y => {
        if (!reductions.find(z => z.reason === y.reason)) {
          reductions.push({
            id: i,
            reason: y.reason
          })
          i++
        }
      })
    }
  })
  return reductions
}

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
          { text: 'Quarterly reduction', style: 'tableHeader' }
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
  if (!fundReductions.length) {
    return ''
  }
  return `\n${(fundReductions.map(x => {
    const reduction = reductions.find(y => y.reason === x.reason)
    return `\n(${reduction.id})`
  })).join('')}`
}

const getReductions = (reductions) => {
  if (!reductions.length) {
    return []
  }
  return [
    { text: 'Reason for reductions', style: 'header3' },
    ...getReductionList(reductions)
  ]
}

const getReductionList = (reductions) => {
  const list = []
  reductions.forEach(x => {
    list.push(`(${x.id}) ${x.reason}`)
  })
  return list
}

module.exports = part2
