const Joi = require('joi')

module.exports = Joi.object({
  invoiceNumber: Joi.string().required(),
  reference: Joi.string().required(),
  dueDate: Joi.string().required(),
  expected: Joi.string().required(),
  calculated: Joi.string().required(),
  value: Joi.string().required()
})
