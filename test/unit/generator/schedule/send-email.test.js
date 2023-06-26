const { notifyConfig } = require('../../../mocks/modules/config')

const { mockNotifyClient } = require('../../../mocks/modules/notifications-node-client')

const sendEmail = require('../../../../app/generator/schedule/send-email')

describe('Send email', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When email is sent successfully', () => {
    test('should call mockNotifyClient', async () => {
      await sendEmail()
      expect(mockNotifyClient).toHaveBeenCalled()
    })

    test('should call mockNotifyClient once', async () => {
      await sendEmail()
      expect(mockNotifyClient).toHaveBeenCalledTimes(1)
    })

    test('should call mockNotifyClient with notifyConfig.apiKey', async () => {
      await sendEmail()
      expect(mockNotifyClient).toHaveBeenCalledWith(notifyConfig.apiKey)
    })

    test('should call mockNotifyClient.sendEmail', async () => {
      await sendEmail()
      expect(mockNotifyClient().sendEmail).toHaveBeenCalled()
    })

    test('should call mockNotifyClient.sendEmail once', async () => {
      await sendEmail()
      expect(mockNotifyClient().sendEmail).toHaveBeenCalledTimes(1)
    })

    test('should call mockNotifyClient.sendEmail with notifyConfig.emailTemplateKey and notifyConfig.emailAddress', async () => {
      await sendEmail()
      expect(mockNotifyClient().sendEmail).toHaveBeenCalledWith(notifyConfig.emailTemplateKey, notifyConfig.emailAddress)
    })

    test('should return undefined', async () => {
      const result = await sendEmail()
      expect(result).toBeUndefined()
    })
  })

  describe('When mockNotifyClient.sendEmail throws', () => {
    beforeEach(() => {
      mockNotifyClient().sendEmail.mockRejectedValue(new Error('Notify issue'))
      jest.clearAllMocks()
    })

    test('should call mockNotifyClient', async () => {
      try { await sendEmail() } catch {}
      expect(mockNotifyClient).toHaveBeenCalled()
    })

    test('should call mockNotifyClient once', async () => {
      try { await sendEmail() } catch {}
      expect(mockNotifyClient).toHaveBeenCalledTimes(1)
    })

    test('should call mockNotifyClient with notifyConfig.apiKey', async () => {
      try { await sendEmail() } catch {}
      expect(mockNotifyClient).toHaveBeenCalledWith(notifyConfig.apiKey)
    })

    test('should call mockNotifyClient.sendEmail', async () => {
      try { await sendEmail() } catch {}
      expect(mockNotifyClient().sendEmail).toHaveBeenCalled()
    })

    test('should call mockNotifyClient.sendEmail once', async () => {
      try { await sendEmail() } catch {}
      expect(mockNotifyClient().sendEmail).toHaveBeenCalledTimes(1)
    })

    test('should call mockNotifyClient.sendEmail with notifyConfig.emailTemplateKey and notifyConfig.emailAddress', async () => {
      try { await sendEmail() } catch {}
      expect(mockNotifyClient().sendEmail).toHaveBeenCalledWith(notifyConfig.emailTemplateKey, notifyConfig.emailAddress)
    })

    test('should throw', async () => {
      const wrapper = async () => { await sendEmail() }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error', async () => {
      const wrapper = async () => { await sendEmail() }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "Notify issue"', async () => {
      const wrapper = async () => { await sendEmail() }
      expect(wrapper).rejects.toThrow(/^Notify issue$/)
    })
  })
})
