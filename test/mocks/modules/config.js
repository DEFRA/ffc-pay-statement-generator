const mockConfig = {}

const mockNotifyConfig = {
  emailAddress: 'test@email.com',
  apiKey: '',
  emailTemplateKey: ''
}

mockConfig.notifyConfig = mockNotifyConfig

jest.mock('../../../app/config', () => {
  return mockConfig
})

module.exports = mockConfig
