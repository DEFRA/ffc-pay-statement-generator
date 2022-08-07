const Joi = require('joi')

module.exports = Joi.object({
  line1: Joi.string().optional().allow(''),
  line2: Joi.string().optional().allow(''),
  line3: Joi.string().optional().allow(''),
  line4: Joi.string().optional().allow(''),
  line5: Joi.string().optional().allow(''),
  postcode: Joi.string().required()
})
