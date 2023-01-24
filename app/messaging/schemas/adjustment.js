const Joi = require('joi')

module.exports = Joi.object({
  currentValue: Joi.string().required(),
  newValue: Joi.string().required(),
  adjustmentValue: Joi.string().required()
}).required()
