const path = require('path')
const { millimetresToPoints } = require('../../conversion')
const getAddress = require('./get-address')
const getBusinessName = require('./get-business-name')
const getSBI = require('./get-sbi')
const getSummaryText = require('./get-summary-text')
const imagePath = path.join(__dirname, '../..', 'images')

const summary = (statement) => {
  return {
    stack: [
      { image: `${imagePath}/rpa-logo.jfif`, fit: [millimetresToPoints(200), millimetresToPoints(25)], style: 'logo' },
      getAddress(statement.businessName, statement.address),
      { text: `${statement.scheme.name} ${statement.scheme.year}`, style: 'header1' },
      { text: 'Payment statement', style: 'subTitle' },
      getBusinessName(statement.businessName),
      getSBI(statement.sbi),
      ...getSummaryText(statement.scheme)
    ],
    unbreakable: true
  }
}

module.exports = summary
