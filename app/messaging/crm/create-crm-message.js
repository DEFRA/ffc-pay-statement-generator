const schema = require('./crm-schema')

const createCrmMessage = (statement, blobUrl) => {
  const crm = {
    sbi: statement.sbi,
    frn: statement.frn,
    blobUrl: decodeURIComponent(blobUrl)
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
