const Joi = require('joi')

const schema = Joi.object({
  emailAddress: Joi.string().required(),
  apiKey: Joi.string().required(),
  emailTemplateKey: Joi.string().required()
})

const config = {
  emailAddress: process.env.NOTIFY_EMAIL_ADDRESS,
  apiKey: process.env.NOTIFY_API_KEY,
  emailTemplateKey: process.env.NOTIFY_EMAIL_TEMPLATE_KEY
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

module.exports = result.value
