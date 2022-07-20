const processStatementMessage = async (message, receiver) => {
  try {
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process statement message:', err)
  }
}

module.exports = processStatementMessage
