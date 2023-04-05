const path = require('path')
const { millimetresToPoints } = require('../../../conversion')
const getAddress = require('../../get-address')
const getAgreementReference = require('./get-agreement-reference')
const getBusinessName = require('./get-business-name')
const getSBI = require('./get-sbi')
const imagePath = path.join(__dirname, '../../..', 'images')

const part1 = (schedule) => {
  return {
    stack: [
      { image: `${imagePath}/rpa-logo.jfif`, fit: [millimetresToPoints(200), millimetresToPoints(25)], style: 'scheduleLogo' },
      getAddress(schedule.businessName, schedule.address),
      { text: `${schedule.scheme.name}`, style: 'header1' },
      { text: 'Revised payment schedule', style: 'subTitle' },
      getBusinessName(schedule.businessName),
      getSBI(schedule.sbi),
      getAgreementReference(schedule.scheme.agreementNumber)
    ],
    unbreakable: true
  }
}

module.exports = part1
