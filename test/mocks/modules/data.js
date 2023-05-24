const mockCommit = jest.fn()
const mockRollback = jest.fn()

const mockTransaction = jest.fn().mockImplementation(() => {
  return {
    commit: mockCommit,
    rollback: mockRollback
  }
})

const mockSequelize = {
  transaction: mockTransaction
}

const mockCreate = jest.fn()

jest.mock('../../../app/data', () => {
  return {
    sequelize: mockSequelize,
    generation: {
      create: mockCreate
    }
  }
})

module.exports = {
  mockTransaction,
  mockCreate
}
