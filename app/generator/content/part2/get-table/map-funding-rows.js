const toCurrencyString = require('../../../to-currency-string')

const mapFundingRows = (fundings) => {
  return fundings.map(x => ([
    x.name,
    x.level,
    { text: x.rate, style: 'tableNumber' },
    { text: x.area, style: 'tableNumber' },
    { text: `${toCurrencyString(x.annualValue)}`, style: 'tableNumber' },
    { text: `${toCurrencyString(x.quarterlyValue)}`, style: 'tableNumber' },
    { text: `${toCurrencyString(x.quarterlyReduction)}`, style: 'tableNumber' },
    { text: `£${x.quarterlyPayment}`, style: 'tableNumber' }
  ]))
}

module.exports = mapFundingRows
