const { crmTopic, crmConfig } = require('../../config')
const { MessageSender } = require('ffc-messaging')
const createCrmMessage = require('./create-crm-message')
const sendCrmMessageRetryExhausted = require('./send-crm-message-retry-exhausted')

const sendCrmMessage = async (statement, filename, retryNo = 0) => {
  let retry = false
  if (retryNo <= crmConfig.sendRetryNoOfTimes) {
    const message = createCrmMessage(statement, crmConfig.blobBaseUrl, filename)
    const sender = new MessageSender(crmTopic)
    retryNo += 1
    try {
      await sender.sendMessage(message)
    } catch (err) {
      console.error(err)
      retry = true
    } finally {
      if (retry) {
        await new Promise(resolve => setTimeout(resolve, crmConfig.sendRetryInterval))
        await sendCrmMessage(statement, filename, retryNo)
      }
    }
    await sender.closeConnection()
  } else {
    sendCrmMessageRetryExhausted(statement, filename, retryNo)
  }
}

module.exports = sendCrmMessage
