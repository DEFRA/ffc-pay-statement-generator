const mockCreate = jest.fn()

jest.mock('../../../app/data', () => {
  return {
    generation: {
      create: mockCreate
    }
  }
})

module.exports = mockCreate
