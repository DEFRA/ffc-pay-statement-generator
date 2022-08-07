const generateStatement = require('../generator')
const util = require('util')
const schema = require('./schemas/statement')

const processStatementMessage = async (message, receiver) => {
  try {
    const statement = message.body
    console.log('Statement received:', util.inspect(statement, false, null, true))
    const validationResult = schema.validate(statement, { abortEarly: false })
    if (validationResult.error) {
      throw new Error(`Statement content is invalid, ${validationResult.error.message}`)
    }
    await generateStatement(statement)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process statement:', err)
  }
}

module.exports = processStatementMessage
