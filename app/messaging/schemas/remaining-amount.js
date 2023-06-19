const Joi = require('joi')

module.exports = Joi.number().integer().required()
  .messages({
    'number.base': 'The remaining amount must be a number.',
    'number.integer': 'The remaining amount must be an integer.',
    '*': 'The remaining amount is required.'
  })
