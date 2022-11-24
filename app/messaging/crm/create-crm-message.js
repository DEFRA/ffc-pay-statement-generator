const schema = require('./crm-schema')
const { statementVersion, statementReceiverEndpoint } = require('../../config')

const createCrmMessage = (statement, filename) => {
  const crm = {
    apiLink: `${statementReceiverEndpoint}/statement/${statementVersion}/${filename}`,
    frn: statement.frn,
    sbi: statement.sbi
  }

  const result = schema.validate(crm, {
    abortEarly: false
  })

  if (result.error) {
    throw new Error(`Invalid crm details for file ${statement.sbi}: ${result.error.message}`)
  }

  return {
    body: {
      ...crm
    },
    type: 'uk.gov.pay.statement.crm',
    source: 'ffc-pay-statement-generator'
  }
}

module.exports = createCrmMessage
