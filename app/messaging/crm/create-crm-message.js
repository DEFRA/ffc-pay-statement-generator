const schema = require('./crm-component-schema')

const createCrmMessage = (statement, baseUrl, filename) => {
  const crmComponent = {
    sbi: statement.sbi,
    frn: statement.frn,
    blobBaseUrl: baseUrl,
    filename
  }

  const result = schema.validate(crmComponent, {
    abortEarly: false
  })

  if (result.error) {
    throw new Error(`Invalid crm details for file ${filename}: ${result.error.message}`)
  }

  return {
    body: {
      sbi: statement.sbi,
      frn: statement.frn,
      blobUrl: baseUrl.concat(filename)
    },
    type: 'uk.gov.pay.statement.crm',
    source: 'ffc-pay-statement-generator'
  }
}

module.exports = createCrmMessage
