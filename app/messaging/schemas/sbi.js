const Joi = require('joi')

module.exports = Joi.number().integer().min(105000000).max(999999999).required()
