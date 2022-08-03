const part2 = (statement) => {
  return [
    title,
    getSummaryText(statement.scheme),
    getTable(statement.funding)
  ]
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

const getTable = (funding) => {
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
        ...mapFundingRows(funding)
      ]
    }
  }
}

const mapFundingRows = (funding) => {
  return funding.map(x => ([x.name, x.level, x.rate, x.area, x.annualValue, x.quarterlyValue, x.quarterlyReduction, x.quarterlyPayment]))
}

module.exports = part2
