const Joi = require('joi')

const { IMMEDIATE, QUARTERLY } = require('../../constants/payment-types')

module.exports = Joi.object({
  order: Joi.number().required(),
  dueDate: Joi.string().optional().allow('', null),
  period: Joi.string().optional().allow('', null),
  value: Joi.string().required(),
  paymentType: Joi.string().valid([IMMEDIATE, QUARTERLY]).required()
})
