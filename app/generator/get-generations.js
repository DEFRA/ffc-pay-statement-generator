const db = require('../data')

const getGenerations = async (documentReference, transaction) => {
  return db.generation.findOne({
    transaction,
    lock: true,
    where: {
      documentReference
    }
  })
}

module.exports = getGenerations
