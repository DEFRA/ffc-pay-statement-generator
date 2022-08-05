const db = require('../data')

const createLog = async (statementData, filename) => {
  await db.generation.create({ statementData, dateGenerated: new Date(), filename })
}

module.exports = createLog
