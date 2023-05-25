const db = require('../data')

const getGenerations = async (documentReference, transaction) => {
  return db.generation.findOne({
    transaction,
    lock: true,
    where: {
      [db.Sequelize.Op.and]: [{ documentReference }, {
        documentReference: {
          [db.Sequelize.Op.ne]: null
        }
      }]
    }
  })
}

module.exports = getGenerations
