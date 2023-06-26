const mockSendEmail = jest.fn()

const mockNotifyClient = jest.fn().mockImplementation(() => {
  return {
    sendEmail: mockSendEmail
  }
})

jest.mock('notifications-node-client', () => {
  return {
    NotifyClient: mockNotifyClient
  }
})

module.exports = {
  mockNotifyClient
}
