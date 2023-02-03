const createMessage = (statement, filename, typeId) => {
  return {
    body: {
      businessName: statement.businessName,
      sbi: statement.sbi,
      frn: statement.frn,
      address: statement.address,
      email: statement.email,
      filename,
      scheme: statement.scheme
    },
    type: `uk.gov.pay.${typeId}.publish`,
    source: 'ffc-pay-statement-generator'
  }
}

module.exports = createMessage
