const Joi = require('joi')

const businessName = require('./business-name')
const frn = require('./frn')
const sbi = require('./sbi')
const email = require('./email')
const address = require('./address')
const scheme = require('./scheme')
const adjustment = require('./adjustment')
const paymentSchedule = require('./payment-schedule')
const documentReference = require('./document-reference')

module.exports = Joi.object({
  businessName,
  frn,
  sbi,
  email,
  address,
  scheme,
  documentReference,
  adjustment,
  remainingAmount: Joi.number().integer().required(),
  schedule: Joi.array().items(paymentSchedule).required()
}).required()
