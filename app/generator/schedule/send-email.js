const { NotifyClient } = require('notifications-node-client')

const { notifyConfig } = require('../../config')

const sendEmail = async () => {
  const notifyClient = new NotifyClient(notifyConfig.apiKey)
  await notifyClient.sendEmail(notifyConfig.emailTemplateKey, notifyConfig.emailAddress)
}

module.exports = sendEmail
