const Joi = require('joi')

const schema = Joi.object({
  blobBaseUrl: Joi.string(),
  sendRetryInterval: Joi.number().default(500),
  sendRetryNoOfTimes: Joi.number().default(3)
})

const config = {
  blobBaseUrl: process.env.BLOB_BASE_URL,
  sendRetryInterval: process.env.SEND_RETRY_INTERVAL,
  sendRetryNoOfTimes: process.env.SEND_RETRY_NO_OF_TIMES
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The crm config is invalid. ${result.error.message}`)
}

module.exports = result.value
