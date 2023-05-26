const MESSAGE_SOURCE = require('../../constants/message-source')

const createMessage = (statement, filename, typeId) => {
  return {
    body: {
      businessName: statement.businessName,
      sbi: statement.sbi,
      frn: statement.frn,
      address: statement.address,
      email: statement.email,
      filename,
      scheme: statement.scheme,
      documentReference: statement?.documentReference ?? null
    },
    type: `uk.gov.pay.${typeId}.publish`,
    source: MESSAGE_SOURCE
  }
}

module.exports = createMessage
