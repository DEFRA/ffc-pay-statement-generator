const path = require('path')
const { millimetresToPoints } = require('../../../conversion')
const { getAddress } = require('../../get-address')
const getBusinessName = require('./get-business-name')
const getSBI = require('./get-sbi')
const imagePath = path.join(__dirname, '../../..', 'images')

const summary = (schedule) => {
  return {
    stack: [
      { image: `${imagePath}/rpa-logo.jfif`, fit: [millimetresToPoints(200), millimetresToPoints(25)], style: 'logo' },
      getAddress(schedule.businessName, schedule.address),
      { text: `${schedule.scheme.name} ${schedule.scheme.year}`, style: 'header1' },
      { text: 'Revised payment schedule', style: 'subTitle' },
      getBusinessName(schedule.businessName),
      getSBI(schedule.sbi),
      `\n\nThis document explains your payment schedule for the ${schedule.scheme.name} (${schedule.scheme.shortName}).`
    ],
    unbreakable: true
  }
}

module.exports = summary
