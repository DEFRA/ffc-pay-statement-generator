const getReductions = require('./get-reductions')
const getTable = require('./get-table')
const mapReductions = require('./map-reductions')

const part2 = (statement) => {
  const reductions = mapReductions(statement.funding)

  return {
    stack: [
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
    ],
    unbreakable: true
  }
}

module.exports = part2
