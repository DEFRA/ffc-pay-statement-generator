const address = require('../mocks/components/address')
const businessName = require('../mocks/components/business-name')
const documentReference = require('../mocks/components/document-reference')

const { topUpAdjustment, reductionAdjustment } = require('../mocks/objects/adjustment')

const topUpScheduleTimeline = require('../mocks/objects/schedule')

const baseSchedule = {
  businessName,
  sbi: 123456789,
  frn: 1234567890,
  email: 'farmer@farms.com',
  documentReference,
  address,
  remainingAmount: 200,
  scheme: {
    name: 'Sustainable Farming Incentive',
    shortName: 'SFI',
    year: '2022',
    frequency: 'Quarterly',
    agreementNumber: 'SFI1234567'
  }
}

const topUpSchedule = {
  ...baseSchedule,
  schedule: topUpScheduleTimeline,
  adjustment: topUpAdjustment
}

const reductionSchedule = {
  ...baseSchedule,
  adjustment: reductionAdjustment
}

module.exports = {
  topUpSchedule,
  reductionSchedule
}
