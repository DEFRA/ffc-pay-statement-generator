const Joi = require('joi')

module.exports = Joi.object({
  order: Joi.number().required(),
  dueDate: Joi.string().optional().allow('', null),
  period: Joi.string().optional().allow('', null),
  value: Joi.string().required()
})
