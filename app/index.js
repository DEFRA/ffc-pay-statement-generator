require('./insights').setup()
require('log-timestamp')
const generateStatement = require('./generator')
const messaging = require('./messaging')
const { initialiseContainers } = require('./storage')

process.on('SIGTERM', async () => {
  await messaging.stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await messaging.stop()
  process.exit(0)
})

module.exports = (async () => {
  initialiseContainers()
  await messaging.start()
  await generateStatement()
})()
