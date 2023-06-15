const path = require('path')
const { millimetresToPoints } = require('../../../conversion')
const getAddress = require('../../get-address')
const getBusinessName = require('../../get-business-name')
const getAgreementReference = require('./get-agreement-reference')
const getSBI = require('./get-sbi')
const imagePath = path.join(__dirname, '../../..', 'images')

const part1 = (schedule) => {
  return {
    stack: [
      { image: `${imagePath}/rpa-logo.jfif`, fit: [millimetresToPoints(200), millimetresToPoints(25)], style: 'scheduleLogo' },
      getAddress(schedule.businessName, schedule.address),
      getSBI(schedule.sbi),
      getBusinessName(schedule.businessName),
      getAgreementReference(schedule.scheme.agreementNumber),
      { text: `${schedule.scheme.name} (${schedule.scheme.shortName}) revised payment schedule `, style: 'header3' }
    ],
    unbreakable: true
  }
}

module.exports = part1
