const Joi = require('joi')

module.exports = Joi.object({
  line1: Joi.string().optional(),
  line2: Joi.string().optional(),
  line3: Joi.string().optional(),
  line4: Joi.string().optional(),
  line5: Joi.string().optional(),
  postcode: Joi.string().required()
})
