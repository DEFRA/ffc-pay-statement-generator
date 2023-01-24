const Joi = require('joi')
const businessName = require('./business-name')
const frn = require('./frn')
const sbi = require('./sbi')
const email = require('./email')
const address = require('./address')
const scheme = require('./scheme')

module.exports = Joi.object({
  businessName,
  frn,
  sbi,
  email,
  address,
  scheme
}).required()
