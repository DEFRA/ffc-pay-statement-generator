const path = require('path')
const { millimetresToPoints } = require('../../../../conversion')
const getBusinessName = require('../../../get-business-name')
const getSBI = require('../../../summary/get-sbi')
const getAgreementNumber = require('../../../summary/get-agreement-number')
const greetName = require('../../../greet-name')
const imagePath = path.join(__dirname, '../../../../', 'images')

const summary = (document) => {
  return {
    stack: [
      { image: `${imagePath}/v2/rpa-logo-long.png`, fit: [millimetresToPoints(85), millimetresToPoints(15)], style: 'logo' },
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
