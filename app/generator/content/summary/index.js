const path = require('path')
const { millimetresToPoints } = require('../../conversion')
const getAddress = require('../get-address')
const getBusinessName = require('../get-business-name')
const getSBI = require('./get-sbi')
const getAgreementNumber = require('./get-agreement-number')
const imagePath = path.join(__dirname, '../..', 'images')

const summary = (document) => {
  return {
    stack: [
      { image: `${imagePath}/v2/logo.jpg`, fit: [millimetresToPoints(200), millimetresToPoints(25)], style: 'logo' },
      getAddress(document.businessName, document.address),
      getSBI(document.sbi),
      getBusinessName(document.businessName),
      getAgreementNumber(document.scheme.agreementNumber),
      '\n\n'
    ],
    unbreakable: true
  }
}

module.exports = summary
