const schema = require('./crm-schema')
const { ffcApiPath, statementReceiverEndpoint } = require('../../config')

const createCrmMessage = (statement, blobUrl, filename) => {
  const crm = {
    apiLink: `${statementReceiverEndpoint}/${ffcApiPath}/statement?filename=${filename}`,
    blobUrl: decodeURIComponent(blobUrl),
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
