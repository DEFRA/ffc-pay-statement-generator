const Joi = require('joi')

const schema = Joi.object({
  notifyEmailAddress: Joi.string().required(),
  notifyApiKey: Joi.string().required(),
  notifyEmailTemplateKey: Joi.string().required()
})

const config = {
  notifyEmailAddress: process.env.NOTIFY_EMAIL_ADDRESS,
  notifyApiKey: process.env.NOTIFY_API_KEY,
  notifyEmailTemplateKey: process.env.NOTIFY_EMAIL_TEMPLATE_KEY
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

module.exports = result.value
