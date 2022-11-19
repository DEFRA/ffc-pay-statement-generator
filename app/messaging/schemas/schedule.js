const Joi = require('joi')
const address = require('./address')
const scheme = require('./scheme')

module.exports = Joi.object({
  businessName: Joi.string().required(),
  frn: Joi.number().integer().min(1000000000).max(9999999999).required(),
  sbi: Joi.number().integer().min(105000000).max(999999999).required(),
  email: Joi.string().optional().allow('', null),
  address,
  scheme
}).required()
