const generateStatement = require('../generator')
const util = require('util')

const processStatementMessage = async (message, receiver) => {
  try {
    console.log('Statement received:', util.inspect(message.body, false, null, true))
    await generateStatement(message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process statement message:', err)
  }
}

module.exports = processStatementMessage
