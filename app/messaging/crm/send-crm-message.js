const { crmTopic } = require('../../config')
const { MessageSender } = require('ffc-messaging')
const createCrmMessage = require('./create-crm-message')

const sendCrmMessage = async (statement, blobUrl, filename) => {
  const message = createCrmMessage(statement, blobUrl, filename)
  const sender = new MessageSender(crmTopic)
  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = sendCrmMessage
