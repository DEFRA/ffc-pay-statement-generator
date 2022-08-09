const mapReductionIds = require('./map-reduction-ids')

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

module.exports = mapFundingRows
