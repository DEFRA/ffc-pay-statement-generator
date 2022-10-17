const Joi = require('joi')

module.exports = Joi.object({
  sbi: Joi.number().integer().min(105000000).max(999999999).required(),
  frn: Joi.number().integer().min(1000000000).max(9999999999).required(),
  blobUrl: Joi.string().required()
}).required()
