const part2 = (statement) => {
  const reductions = mapReductions(statement.funding)

  return [
    title,
    getSummaryText(statement.scheme),
    getTable(statement.funding, reductions),
    standardsText,
    ...getReductions(reductions)
  ]
}

const mapReductions = (funding) => {
  const reductions = []
  let i = 1
  funding.forEach(x => {
    if (x.reductions) {
      x.reductions.forEach(y => {
        reductions.push({
          id: i,
          reason: y.reason
        })
        i++
      })
    }
  })
  return reductions
}

const title = {
  text: 'Part 2. Calculation',
  style: 'header2'
}

const getSummaryText = (scheme) => {
  return {
    text: `We calculated the total ${scheme.shortName} payment amount by adding together payments for all the standards which are part of your agreement, as shown in this table.`
  }
}

const getTable = (funding, reductions) => {
  return {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    table: {
      headerRows: 1,
      widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
      body: [
        ['Standard', 'Level', 'Rate', 'Land area (ha)', 'Annual value', 'Quarterly value', 'Quarterly reduction', 'Quarterly reduction'],
        ...mapFundingRows(funding, reductions)
      ]
    }
  }
}

const mapFundingRows = (funding, reductions) => {
  return funding.map(x => ([x.name, x.level, x.rate, x.area, x.annualValue, x.quarterlyValue, x.quarterlyReduction, x.quarterlyPayment]))
}

const standardsText = {
  text: [
    'You can check which land parcels are part of each standard in the Rural Payments service at ',
    { text: 'www.gov.uk/claim-rural-payments', link: 'https://www.gov.uk/claim-rural-payments', style: 'link' },
    '.'
  ]
}

const getReductions = (reductions) => {
  if (!reductions.length) {
    return []
  }
  return [
    reductionReasonHeader,
    ...getReductionList(reductions)
  ]
}

const reductionReasonHeader = {
  text: 'Reason for reductions',
  style: 'header3'
}

const getReductionList = (reductions) => {
  const list = []
  reductions.forEach(x => {
    list.push(`(${x.id}) ${x.reason}`)
  })
  return list
}

module.exports = part2
