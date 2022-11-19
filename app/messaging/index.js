const config = require('../config')
const processMessage = require('./process-message')
const { MessageReceiver } = require('ffc-messaging')
let receiver

const start = async () => {
  const action = message => processMessage(message, receiver)
  receiver = new MessageReceiver(config.statementSubscription, action)
  await receiver.subscribe()

  console.info('Ready to generate payment statements')
}

const stop = async () => {
  await receiver.closeConnection()
}

module.exports = { start, stop }
