const { notifyConfig } = require('../../../mocks/modules/config')

const { mockNotifyClient } = require('../../../mocks/modules/notifications-node-client')

const sendEmail = require('../../../../app/generator/schedule/send-email')

let filename
let agreementNumber

describe('Send email', () => {
  beforeEach(() => {
    filename = 'a'
    agreementNumber = ''
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When email is sent successfully', () => {
    test('should call mockNotifyClient', async () => {
      await sendEmail(filename, agreementNumber)
      expect(mockNotifyClient).toHaveBeenCalled()
    })

    test('should call mockNotifyClient once', async () => {
      await sendEmail(filename, agreementNumber)
      expect(mockNotifyClient).toHaveBeenCalledTimes(1)
    })

    test('should call mockNotifyClient with notifyConfig.apiKey', async () => {
      await sendEmail(filename, agreementNumber)
      expect(mockNotifyClient).toHaveBeenCalledWith(notifyConfig.apiKey)
    })

    test('should call mockNotifyClient.sendEmail', async () => {
      await sendEmail(filename, agreementNumber)
      expect(mockNotifyClient().sendEmail).toHaveBeenCalled()
    })

    test('should call mockNotifyClient.sendEmail once', async () => {
      await sendEmail(filename, agreementNumber)
      expect(mockNotifyClient().sendEmail).toHaveBeenCalledTimes(1)
    })

    test('should call mockNotifyClient.sendEmail with notifyConfig.emailTemplateKey, notifyConfig.emailAddress and { personalisation: { agreementNumber: agreementNumber, filename: filename } }', async () => {
      await sendEmail(filename, agreementNumber)
      expect(mockNotifyClient().sendEmail).toHaveBeenCalledWith(notifyConfig.emailTemplateKey, notifyConfig.emailAddress, { personalisation: { agreementNumber, filename } })
    })

    test('should return undefined', async () => {
      const result = await sendEmail(filename, agreementNumber)
      expect(result).toBeUndefined()
    })
  })

  describe('When mockNotifyClient.sendEmail throws', () => {
    beforeEach(() => {
      mockNotifyClient().sendEmail.mockRejectedValue(new Error('Notify issue'))
      jest.clearAllMocks()
    })

    test('should call mockNotifyClient', async () => {
      try { await sendEmail(filename, agreementNumber) } catch {}
      expect(mockNotifyClient).toHaveBeenCalled()
    })

    test('should call mockNotifyClient once', async () => {
      try { await sendEmail(filename, agreementNumber) } catch {}
      expect(mockNotifyClient).toHaveBeenCalledTimes(1)
    })

    test('should call mockNotifyClient with notifyConfig.apiKey', async () => {
      try { await sendEmail(filename, agreementNumber) } catch {}
      expect(mockNotifyClient).toHaveBeenCalledWith(notifyConfig.apiKey)
    })

    test('should call mockNotifyClient.sendEmail', async () => {
      try { await sendEmail(filename, agreementNumber) } catch {}
      expect(mockNotifyClient().sendEmail).toHaveBeenCalled()
    })

    test('should call mockNotifyClient.sendEmail once', async () => {
      try { await sendEmail(filename, agreementNumber) } catch {}
      expect(mockNotifyClient().sendEmail).toHaveBeenCalledTimes(1)
    })

    test('should call mockNotifyClient.sendEmail with notifyConfig.emailTemplateKey, notifyConfig.emailAddress and { personalisation: { agreementNumber: agreementNumber, filename: filename } }', async () => {
      try { await sendEmail(filename, agreementNumber) } catch {}
      expect(mockNotifyClient().sendEmail).toHaveBeenCalledWith(notifyConfig.emailTemplateKey, notifyConfig.emailAddress, { personalisation: { agreementNumber, filename } })
    })

    test('should throw', async () => {
      const wrapper = async () => { await sendEmail(filename, agreementNumber) }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error', async () => {
      const wrapper = async () => { await sendEmail(filename, agreementNumber) }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "Notify issue"', async () => {
      const wrapper = async () => { await sendEmail(filename, agreementNumber) }
      expect(wrapper).rejects.toThrow(/^Notify issue$/)
    })
  })
})
