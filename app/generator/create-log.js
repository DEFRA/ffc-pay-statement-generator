const db = require('../data')

const createLog = async (statementData, filename, dateGenerated) => {
  await db.generation.create({ statementData, filename, dateGenerated })
}

module.exports = createLog
