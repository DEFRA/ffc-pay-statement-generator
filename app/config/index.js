const Joi = require('joi')
const mqConfig = require('./message')
const dbConfig = require('./database')
const storageConfig = require('./storage')

// Define config schema
const schema = Joi.object({
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  statementVersion: Joi.string().required(),
  statementReceiverEndpoint: Joi.string().required()
})

// Build config
const config = {
  env: process.env.NODE_ENV,
  statementVersion: process.env.STATEMENT_VERSION,
  statementReceiverEndpoint: process.env.STATEMENT_RECEIVER_ENDPOINT
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the Joi validated value
const value = result.value

// Add some helper props
value.isDev = value.env === 'development'
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'
value.statementSubscription = mqConfig.statementSubscription
value.publishTopic = mqConfig.publishTopic
value.crmTopic = mqConfig.crmTopic
value.dbConfig = dbConfig
value.storageConfig = storageConfig

module.exports = value
