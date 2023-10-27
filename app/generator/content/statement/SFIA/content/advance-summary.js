const path = require('path')
const { millimetresToPoints } = require('../../../../conversion')
const getBusinessName = require('../../../get-business-name')
const getSBI = require('../../../summary/get-sbi')
const getAgreementNumber = require('../../../summary/get-agreement-number')
const imagePath = path.join(__dirname, '../..', 'images')

const summary = (document) => {
  return {
    stack: [
      { image: `${imagePath}/v2/logo.jpg`, fit: [millimetresToPoints(200), millimetresToPoints(25)], style: 'logo' },
      getSBI(document.sbi),
      getBusinessName(document.businessName),
      getAgreementNumber(document.scheme.agreementNumber),
      { text: 'Our ref: SFI 23 Accelerated payment v1.0' },
      '\n\n',
      { text: 'Dear <INSERT businessName>' }
    ],
    unbreakable: true
  }
}

module.exports = summary
