const Joi = require('joi')

module.exports = Joi.number().integer().min(1000000000).max(9999999999).required()
