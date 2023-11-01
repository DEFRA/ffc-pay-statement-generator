const path = require('path')
const { millimetresToPoints } = require('../../../../conversion')
const getBusinessName = require('./get-business-name')
const getSBI = require('./get-sbi')
const getAgreementNumber = require('./get-agreement-number')
const greetName = require('../../../greet-name')
const imagePath = path.join(__dirname, '../../../../', 'images')

const summary = (document) => {
  return {
    stack: [
      { image: `${imagePath}/v2/rpa-logo-long.png`, fit: [millimetresToPoints(90), millimetresToPoints(18)], style: 'logoSFIA' },
      getSBI(document.sbi),
      getBusinessName(document.businessName),
      getAgreementNumber(document.scheme.agreementNumber),
      { text: 'Our ref: SFI 23 Accelerated payment v1.0' },
      '\n',
      greetName(document.businessName)
    ]
  }
}

module.exports = summary
