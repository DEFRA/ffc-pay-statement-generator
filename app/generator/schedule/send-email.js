const { NotifyClient } = require('notifications-node-client')

const { notifyConfig } = require('../../config')

const sendEmail = async (filename) => {
  const notifyClient = new NotifyClient(notifyConfig.apiKey)
  await notifyClient.sendEmail(notifyConfig.emailTemplateKey, notifyConfig.emailAddress)
  console.log(`Schedule email sent for ${filename}`)
}

module.exports = sendEmail
