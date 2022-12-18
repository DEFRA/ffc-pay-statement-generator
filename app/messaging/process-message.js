const generateDocument = require('../generator')
const util = require('util')
const validateRequest = require('./validate')
const { VALIDATION } = require('../errors')

const processStatementMessage = async (message, receiver) => {
  try {
    const request = message.body
    const type = message.applicationProperties.type
    console.log('Generation request received:', util.inspect(request, false, null, true))
    validateRequest(request, type)
    await generateDocument(request, type)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process request:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processStatementMessage
